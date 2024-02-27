# neargs

neargs is a simple JavaScript CLI argument parser library, written with vanilla JavaScript. It allows you to read numbers, booleans or arrays from argv.

## Getting Started

### Installing

Just run:

    npm i neargs

## Usage

You will need the `configureParser` module. It receives the following arguments:
* **argv** - The **raw** array of strings given by `process.argv`;
* **options** - An array of objects describing the expected arguments for input.

Example:

```js
import { configureParser } from 'neargs'

function main () {
  const options = [
    {
      shortAlias: 'f',
      longAlias: 'foo',
      type: 'number',
      mandatory: true
    },
    {
      shortAlias: 'b',
      longAlias: 'bool',
      type: 'boolean'
    },
    {
      shortAlias: 'a',
      longAlias: 'array',
      type: 'boolean',
      mandatory: true
    }

  ]

  const parse = configureParser(process.argv, options)
}
```

The `configureParser` function returns a parser function that you can use to get the parsed values. Those values will be stored into an object, where each one will be identified with the option's long alias.

```js
  const parse = configureParser(process.argv, options)
  const parsed = parse()
  
  const foo = parsed.foo
  const bool = parsed.bool
  const array = parsed.array
```

## Built With

  - Vanilla JavaScript.
