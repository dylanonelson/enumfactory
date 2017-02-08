class EnumValue {
  constructor({ name, ordinal, value }) {
    this._name = name;
    this._ordinal = ordinal;
    this._value = value;
  }

  get name() {
    return this._name;
  }

  get ordinal() {
    return this._ordinal;
  }

  get value() {
    return this._value;
  }

  toString() {
    return `Enum ${this.name}`;
  }

  valueOf() {
    return this.value;
  }
}

export default EnumValue;
