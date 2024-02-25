export function getOptionIndex (args, option) {
  const index = args.indexOf(`-${option.shortAlias}`)
  return index !== -1 ? index : args.indexOf(`--${option.longAlias}`)
}
