export type ResponseError<E> = E & {
  type: 'error'
}

export type ResponseSuccess<T> = T & {
  type: 'success'
}
