import check from 'check-types';

function EnumValue({ name, ordinal, value, enumType }) {
  const enumValueGenerator = new Function ('value',
    `return function ${name}() { return value }`
  );

  const enumValue = enumValueGenerator(value);

  enumValue.ordinal = ordinal;

  const toString = () => `Enum ${name}`;

  enumValue.getDeclaringClass = () => value.prototype ?
    value.prototype.constructor :
    value.__proto__ ?
    value.__proto__.constructor :
    undefined;

  if (check.instance(value, String)) {
    enumValue.toString = toString;
  }

  else {
    if (value.toString && value.toString !== Object.prototype.toString) {
      enumValue.toString = value.toString.bind(value);
    } else {
      enumValue.toString = toString;
    }
  }

  return enumValue;
}

export default EnumValue;
