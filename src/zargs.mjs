import { ARRAY_OPTION_TYPE, BOOLEAN_OPTION_TYPE, NUMBER_OPTION_TYPE } from './constants.mjs'

function getOptionIndex (args, option) {
  const index = args.indexOf(`-${option.shortAlias}`)
  return index !== -1 ? index : args.indexOf(`--${option.longAlias}`)
}

function parseNumber (args, option) {
  if (option.type !== NUMBER_OPTION_TYPE) throw new Error('Expected a numeric argument.')
  const optionIndex = getOptionIndex(args, option)
  return parseInt(args[optionIndex + 1])
}

function parseBoolean (args, option) {
  if (option.type !== BOOLEAN_OPTION_TYPE) throw new Error('Expected a boolean argument.')
  const optionIndex = getOptionIndex(args, option)
  return optionIndex !== -1
}

function parseArray (args, option) {
  if (option.type !== ARRAY_OPTION_TYPE) throw new Error('Expected an array argument.')
  const optionIndex = getOptionIndex(args, option)

  const array = []
  for (let index = optionIndex + 1; index < args.length; index++) {
    const element = args[index]
    if (element.startsWith('-')) break
    array.push(element)
  }

  return array
}

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
