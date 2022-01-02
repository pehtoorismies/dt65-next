export const validateEmail = (value: string) => {
  let error
  if (!value) {
    error = 'Sähköposti on pakollinen'
  } else if (!/^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,4}$/i.test(value)) {
    error = 'Sähköposti väärän muotoinen'
  }
  return error
}

export const validatePassword = (value: string) => {
  let error
  if (!value) {
    error = 'Salasana on pakollinen'
  } else if (value.length < 6) {
    error = 'Salasana on liian lyhyt'
  }
  return error
}

export const isRequired = (value: string, fieldName: string) => {
  let error
  if (!value) {
    error = `${fieldName} on pakollinen`
  }
  return error
}
