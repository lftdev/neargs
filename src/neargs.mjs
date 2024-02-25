import { ARRAY_OPTION_TYPE, BOOLEAN_OPTION_TYPE, NUMBER_OPTION_TYPE } from './constants.mjs'
import { InputError } from './errors.mjs'
import { parseArray, parseBoolean, parseNumber } from './parse-data-type.mjs'
import { getOptionIndex } from './utils.mjs'

export function configureParser (argv, options) {
  if (!Array.isArray(argv)) throw new InputError('Expected to receive the arguments array.')
  if (!Array.isArray(options)) throw new InputError('Expected to receive the options object.')

  const args = argv.slice(2)
  if (args.length === 0) throw new InputError('Expected arguments array not to be empty.')
  if (args.some(element => typeof element !== 'string')) throw new InputError('Expected argv array to contain strings only.')

  const mandatoryOptions = options.filter(option => option.mandatory)
  if (mandatoryOptions.length !== 0) {
    const mandatoryOptionsArePresent = (args, mandatoryOptions) => mandatoryOptions.every(option => getOptionIndex(args, option) !== -1)
    if (!mandatoryOptionsArePresent(args, mandatoryOptions)) throw new InputError(`Expected to receive all mandatory options:${mandatoryOptions.reduce((result, current) => result + `\n-${current.shortAlias}/--${current.longAlias}`, '')}.`)
  }

  return () => options.reduce((result, current, index) => {
    let parsed
    switch (current.type) {
      case ARRAY_OPTION_TYPE:
        parsed = parseArray(args, options[index])
        break
      case BOOLEAN_OPTION_TYPE:
        parsed = parseBoolean(args, options[index])
        break
      case NUMBER_OPTION_TYPE:
        parsed = parseNumber(args, options[index])
    }
    result[current.longAlias] = parsed
    return result
  }, {})
}
