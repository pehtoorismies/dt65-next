const getEnv = (value: string | undefined, name: string): string => {
  if (!value?.trim()) {
    throw new Error(`Missing environment value 'process.env.${name}'`)
  }
  return value
}

type AuthConfig = {
  domain: string
  clientId: string
  clientSecret: string
  jwtAudience: string
}

export const getAuthConfig = (): AuthConfig => {
  return {
    domain: getEnv(process.env.AUTH_DOMAIN, 'AUTH_DOMAIN'),
    clientId: getEnv(process.env.AUTH_CLIENT_ID, 'AUTH_DOMAIN'),
    clientSecret: getEnv(process.env.AUTH_CLIENT_SECRET, 'AUTH_CLIENT_SECRET'),
    jwtAudience: getEnv(process.env.JWT_AUDIENCE, 'JWT_AUDIENCE'),
  }
}
