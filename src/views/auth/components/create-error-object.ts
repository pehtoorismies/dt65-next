import { filter, fromPairs, pipe } from 'remeda'

export const createErrorObject = (
  errorArray: [string, string | undefined][]
) => {
  return pipe(
    errorArray,
    filter(([_, value]) => value !== undefined),
    fromPairs
  )
}
