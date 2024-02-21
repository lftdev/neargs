const createError = name =>
  class CustomError extends Error {
    constructor (message) {
      super(message)
      this.name = name
    }
  }

export const InputError = createError('InputError')
export const DataTypeError = createError('DataTypeError')
