import * as Sentry from '@sentry/nextjs'
import NextErrorComponent, { ErrorProps as NextErrorProps } from 'next/error'

import type { NextPageContext } from 'next'

export type ErrorPageProps = {
  err: Error
  statusCode: number
  hasGetInitialPropsRun: boolean
}

export type ErrorProps = {
  hasGetInitialPropsRun: boolean
} & NextErrorProps

const ErrorPage = (props: ErrorPageProps): JSX.Element => {
  const { statusCode, hasGetInitialPropsRun, err } = props

  if (process.env.NEXT_PUBLIC_APP_STAGE !== 'development') {
    console.warn(
      'ErrorPage - Unexpected error caught, it was captured and sent to Sentry. Error details:'
    )
    console.error(err)
  }

  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.tsx so it can be captured
    Sentry.captureException(err)
    // Flushing is not required in this case as it only happens on the client
  }

  return <NextErrorComponent statusCode={statusCode} />
}

ErrorPage.getInitialProps = async (
  props: NextPageContext
): Promise<ErrorProps> => {
  const { res, err, asPath } = props

  const errorInitialProps: ErrorProps =
    (await NextErrorComponent.getInitialProps({
      res,
      err,
    } as NextPageContext)) as ErrorProps

  if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
    console.error(
      'ErrorPage.getInitialProps - Unexpected error caught, it was captured and sent to Sentry. Error details:',
      err
    )
  }

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.hasGetInitialPropsRun = true

  if (res?.statusCode === 404) {
    return { statusCode: 404, hasGetInitialPropsRun: true }
  }

  if (err) {
    Sentry.captureException(err)
    // Flushing before returning is necessary if deploying to Vercel, see
    // https://vercel.com/docs/platform/limits#streaming-responses
    await Sentry.flush(2000)
    return errorInitialProps
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  )

  await Sentry.flush(2000)

  return errorInitialProps
}

export default ErrorPage
