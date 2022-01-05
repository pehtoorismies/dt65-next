export const AUTH_ERROR_CODES = {
  INVALID_REGISTER_SECRET: 'invalid_register_secret',
  NICK_ALREADY_EXISTS: 'nick_already_exists',
  INVALID_EMAIL_FORMAT: 'invalid_email_format',
  REQUEST_MISSING_FIELDS: 'request_missing_fields',
  INVALID_HTTP_METHOD: 'invalid_http_method',
  AUTH0_UNAUTHORIZED: 'unauthorized', // login: email not verified
  AUTH0_INVALID_GRANT: 'invalid_grant', // login:  username / password wrong
  AUTH0_CONFLICT: 'Conflict', // register: email exists
}
