const getString = (
  value: string | undefined,
  envVariableName: string
): string => {
  if (!value?.trim()) {
    throw new Error(
      `Missing environment value 'process.env.${envVariableName}'`
    )
  }
  return value
}

const getBoolean = (
  value: string | undefined,
  envVariableName: string
): boolean => {
  const envString = getString(value, envVariableName)
  if (envString === 'true') {
    return true
  }
  if (envString == 'false') {
    return false
  }
  throw new Error(
    `Wrong boolean environment value in 'process.env.${envVariableName}'. Allowed values are true or false`
  )
}

type AuthConfig = {
  domain: string
  clientId: string
  clientSecret: string
  jwtAudience: string
  registerSecretCode: string
}

export const getAuthConfig = (): AuthConfig => {
  return {
    domain: getString(process.env.AUTH_DOMAIN, 'AUTH_DOMAIN'),
    clientId: getString(process.env.AUTH_CLIENT_ID, 'AUTH_DOMAIN'),
    clientSecret: getString(
      process.env.AUTH_CLIENT_SECRET,
      'AUTH_CLIENT_SECRET'
    ),
    jwtAudience: getString(process.env.JWT_AUDIENCE, 'JWT_AUDIENCE'),
    registerSecretCode: getString(
      process.env.REGISTER_SECRET_CODE,
      'REGISTER_SECRET_CODE'
    ),
  }
}

type SentryConfig = {
  enabled: boolean
}

export const getSentryConfig = (): SentryConfig => {
  return {
    enabled: getBoolean(
      process.env.NEXT_PUBLIC_SENTRY_ENABLED,
      'NEXT_PUBLIC_SENTRY_ENABLED'
    ),
  }
}
