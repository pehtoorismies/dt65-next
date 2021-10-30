export const validateEmail = (value: string) => {
  let error
  if (!value) {
    error = 'Pakollinen'
  } else if (!/^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,4}$/i.test(value)) {
    error = 'Sähköposti väärän muotoinen'
  }
  return error
}

export const validatePassword = (value: string) => {
  let error
  if (!value) {
    error = 'Pakollinen'
  } else if (value.length < 6) {
    error = 'Liian lyhyt'
  }
  return error
}

export const isRequired = (value: string) => {
  let error
  if (!value) {
    error = 'Pakollinen'
  }
  return error
}
