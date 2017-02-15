import { defineConstant, Enum } from 'enumjs';

const Colors = Enum(
  defineConstant('RED'),
  defineConstant('BLUE')
);

Enum.RED; // => EnumValue { _name: 'RED', _ordinal: 0, _value: String }
Enum.RED.name; // => 'RED'
Enum.RED.ordinal; // => 0
Enum.RED instanceof Enum; // => true

console.log('' + Enum.RED) // => logs 'Enum RED'

// Returns the underlying instance
Enum.RED.value; // => {String0: "R"1: "E"2: "D"length: 3__proto__: String[[PrimitiveValue]]: "RED"}
