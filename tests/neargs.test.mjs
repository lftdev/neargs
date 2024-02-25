import { describe, expect, it } from 'vitest'
import { configureParser } from '../src/neargs.mjs'

describe('parse function:', () => {
  it('should throw if argv array is not provided;', () => expect(() => configureParser()).toThrow())
  it('should throw if argv array is null;', () => expect(() => configureParser()).toThrow())
  it('should throw if argv array length is 2;', () => expect(() => configureParser(['', ''])).toThrow())
  it('should throw if argv array does not cotain strings only;', () => expect(() => configureParser([2, 'df', true], {})).toThrow())
  it('should throw if options is not an object;', () => expect(() => configureParser([''], [])).toThrow())
  it('should throw if options object is not provided;', () => expect(() => configureParser([''])).toThrow())
  it('should return parsed number into an object when a numeric option is given;', () => {
    const parsed = configureParser(['env', 'path', '-f', '2'], [{ shortAlias: 'f', longAlias: 'foo', type: 'number' }])()
    expect(parsed.foo).toBe(2)
  })
  it('should return parsed boolean into an object when a boolean option is given;', () => {
    const parsed = configureParser(['env', 'path', '-f'], [{ shortAlias: 'f', longAlias: 'foo', type: 'boolean' }])()
    expect(parsed.foo).toBe(true)
  })
  it('should return parsed array into an object when an array option is given;', () => {
    const elements = ['element1', 'element2', 'element3']
    const parsed = configureParser(['env', 'path', '-f'].concat(elements), [{ shortAlias: 'f', longAlias: 'foo', type: 'array' }])()
    expect(parsed.foo).toStrictEqual(elements)
  })
  it('should parse multiple options and return an object;', () => {
    const elements = ['element1', 'element2', 'element3']
    const parsed = configureParser(['env', 'path', '--bool', '--num', '432', '-f'].concat(elements),
      [{ shortAlias: 'f', longAlias: 'foo', type: 'array' },
        { shortAlias: 'b', longAlias: 'bool', type: 'boolean' },
        { shortAlias: 'n', longAlias: 'num', type: 'number' },
        { shortAlias: 'fl', longAlias: 'flag', type: 'boolean' }])()
    expect(parsed.foo).toStrictEqual(elements)
    expect(parsed.num).toBe(432)
    expect(parsed.bool).toBe(true)
    expect(parsed.flag).toBe(false)
  })
  it('should throw if a mandatory option is not provided;', () => {
    const mandatoryOptions = [{ shortAlias: 'f', longAlias: 'foo', type: 'boolean', mandatory: true }]
    expect(() => configureParser(['env', 'path', '-g'], mandatoryOptions)()).toThrowError(`Expected to receive all mandatory options:${mandatoryOptions.reduce((result, current) => result + `\n-${current.shortAlias}/--${current.longAlias}`, '')}.`)
  })
})
