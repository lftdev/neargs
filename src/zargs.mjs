import { ARRAY_OPTION_TYPE, BOOLEAN_OPTION_TYPE, NUMBER_OPTION_TYPE } from './constants.mjs'
import { parseArray, parseBoolean, parseNumber } from './parse-data-type.mjs'

export function parse (argv, options) {
  if (argv == null) throw new Error('Expected to receive the arguments array.')
  if (options == null || (typeof options !== 'object' && !Array.isArray(options))) throw new Error('Expected to receive the options object.')

  const args = argv.slice(2)
  if (args.length === 0) throw new Error('Expected arguments array not to be empty.')
  if (args.some(element => typeof element !== 'string')) throw new Error('Expected argv array to contain strings only.')

  return options.reduce((result, current, index) => {
    let parsed
    switch (current.type) {
      case NUMBER_OPTION_TYPE:
        parsed = parseNumber(args, options[index])
        break
      case BOOLEAN_OPTION_TYPE:
        parsed = parseBoolean(args, options[index])
        break
      case ARRAY_OPTION_TYPE:
        parsed = parseArray(args, options[index])
    }
    result[current.longAlias] = parsed
    return result
  }, {})
}
