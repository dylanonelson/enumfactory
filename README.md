# enumjs

> Java-like enums in JavaScript

## Example

```javascript
// ES5, in the browser

var createEnum = window.enumjs.createEnum;
var defineConstant = window.enumjs.defineConstant;

var Letters = createEnum(
  defineConstant('ALPHA'),
  defineConstant('BETA')
);

Letters.ALPHA // => ALPHA {}

Letters.ALPHA.name() // => "ALPHA"

Letters.ALPHA.ordinal() // => 0

Letters.ALPHA.toString() // => "Enum ALPHA"

Letters.GAMMA // => Uncaught Error: Value GAMMA is not present in enum.

var Color = function(options) {
  if (options) {
    this._rgb = options.rgb;
    this._hex = options.hex;
    this._name = options.name;
  }
}

export default Colors;


var Colors = createEnum(Color)(
  defineConstant('WHITE')({ hex: '#FFF', name: 'white' }),
  defineConstant('BLACK')({ hex: '#000', name: 'black' })
);

Colors.values() // => [WHITE, BLACK]

Colors.WHITE.hex // => "#FFF"
Colors.WHITE.name // => function () { return name }
Object.getPrototypeOf(Colors.WHITE.name) // => "white"

Colors.RED // => Uncaught Error: Value RED is not present in enum.

var Rainbow = createEnum(Color)(
  defineConstant('RED'),
  defineConstant('ORANGE'),
  defineConstant('YELLOW'),
  defineConstant('RED')
); // => Uncaught Error: Cannot define a constant for RED twice in the same enum
```

## Installation

enumjs is available as an npm module.

## Methods

```javascript
var enumjs = require('enumjs');
```

### enumjs.createEnum
Create a new Enum object. Takes as its arguments either

1. A class or JavaScript constructor function _or_
2. A list of string constants wrapped in a call to enumjs.defineConstant

In the case of *1*, `createEnum` returns a function that takes as its arguments a list of defined constants created with enumjs.defineConstant. See below.

### enumjs.defineConstant
Define an enum constant to be consumed by `createEnum`. Takes as its sole argument the name of the enum to be defined.

When defining a constant with a non-string type -- that is, one instantiated with a class or constructor function -- invoke `defineConstant`'s  return value to pass arguments to the constructor (this is ultimately accomplished by `createEnum`). If there are no arguments, or the EnumType defines only a set of possible string values, do not invoke `defineConstant`'s return value.

### EnumType

#### EnumType#values
Returns an array of EnumValues.

#### EnumType#valueOf(name)
Returns the EnumValue whose name matches the name parameter.

#### EnumType#toString
Returns
```javascript
`Enum type ${constructor.name}`
```

### EnumValue

An EnumValue is what you get when you retrieve a constant from an EnumType.

### EnumValue#ordinal
Returns the index of its definition in the call to `createEnum`.

#### EnumValue#name
Returns its name.
