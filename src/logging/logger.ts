import * as Sentry from '@sentry/nextjs'

import { getSentryConfig } from '#config/config'

const { enabled } = getSentryConfig()

const consoleLogger = {
  warn: (message: string, extra?: Record<string, unknown>): void => {
    console.warn(message, extra)
  },
  error: (error: unknown): void => {
    console.error(error)
  },
}

const sentryLogger = {
  warn: (message: string, extra?: Record<string, unknown>): void => {
    Sentry.captureMessage(message, {
      extra,
      level: Sentry.Severity.Warning,
    })
  },
  error: (error: unknown): void => {
    Sentry.captureException(error)
  },
}

export const logger = () => {
  if (!enabled) {
    return {
      clientLogger: consoleLogger,
      serverLogger: consoleLogger,
    }
  }

  return {
    clientLogger: {
      warn: sentryLogger.warn,
      error: sentryLogger.error,
    },
    serverLogger: {
      warn: async (
        message: string,
        extra?: Record<string, unknown>
      ): Promise<void> => {
        sentryLogger.warn(message, extra)
        await Sentry.flush(2000)
      },
      error: async (error: unknown): Promise<void> => {
        sentryLogger.error(error)
        await Sentry.flush(2000)
      },
    },
  }
}
