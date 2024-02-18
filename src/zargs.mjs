function getOptionIndex (args, option) {
  const index = args.indexOf(`-${option.shortAlias}`)
  return index !== -1 ? index : args.indexOf(`--${option.longAlias}`)
}

function parseNumber (args, option) {
  if (option.type !== 'number') throw new Error('Expected a numeric argument.')
  const optionIndex = getOptionIndex(args, option)
  return parseInt(args[optionIndex + 1])
}

function parseBoolean (args, option) {
  if (option.type !== 'boolean') throw new Error('Expected a boolean argument.')
  const optionIndex = getOptionIndex(args, option)
  return optionIndex !== -1
}

function parseArray (args, option) {
  if (option.type !== 'array') throw new Error('Expected an array argument.')
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

  return options.reduce((result, current) => {
    let parsed
    switch (current.type) {
      case 'number':
        parsed = parseNumber(args, options[0])
        break
      case 'boolean':
        parsed = parseBoolean(args, options[0])
        break
      case 'array':
        parsed = parseArray(args, options[0])
    }
    result[current.longAlias] = parsed
    return result
  }, {})
}
