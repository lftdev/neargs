import { ARRAY_OPTION_TYPE, BOOLEAN_OPTION_TYPE, NUMBER_OPTION_TYPE } from './constants.mjs'

function getOptionIndex (args, option) {
  const index = args.indexOf(`-${option.shortAlias}`)
  return index !== -1 ? index : args.indexOf(`--${option.longAlias}`)
}

export function parseNumber (args, option) {
  if (option.type !== NUMBER_OPTION_TYPE) throw new Error('Expected a numeric argument.')
  const optionIndex = getOptionIndex(args, option)
  return parseInt(args[optionIndex + 1])
}

export function parseBoolean (args, option) {
  if (option.type !== BOOLEAN_OPTION_TYPE) throw new Error('Expected a boolean argument.')
  const optionIndex = getOptionIndex(args, option)
  return optionIndex !== -1
}

export function parseArray (args, option) {
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