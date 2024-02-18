import { describe, expect, it } from 'vitest'
import { parse } from '../src/zargs.mjs'

describe('parse function:', () => {
  it('should throw if argv array is not provided;', () => expect(() => parse()).toThrow())
  it('should throw if argv array is null;', () => expect(() => parse()).toThrow())
  it('should throw if argv array length is 2;', () => expect(() => parse(['', ''])).toThrow())
  it('should throw if argv array does not cotain strings only;', () => expect(() => parse([2, 'df', true], {})).toThrow())
  it('should throw if options is not an object;', () => expect(() => parse([''], [])).toThrow())
  it('should throw if options object is not provided;', () => expect(() => parse([''])).toThrow())
  it('should return parsed number into an object when a numeric option is given;', () => {
    const parsed = parse(['env', 'path', '-f', '2'], [{ shortAlias: 'f', longAlias: 'foo', type: 'number' }])
    expect(parsed.foo).toBe(2)
  })
  it('should return parsed boolean into an object when a boolean option is given;', () => {
    const parsed = parse(['env', 'path', '-f'], [{ shortAlias: 'f', longAlias: 'foo', type: 'boolean' }])
    expect(parsed.foo).toBe(true)
  })
  it('should return parsed array into an object when an array option is given;', () => {
    const elements = ['element1', 'element2', 'element3']
    const parsed = parse(['env', 'path', '-f'].concat(elements), [{ shortAlias: 'f', longAlias: 'foo', type: 'array' }])
    expect(parsed.foo).toStrictEqual(elements)
  })
})
