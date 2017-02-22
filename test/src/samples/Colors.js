class Colors {
  constructor(options) {
    if (options) {
      this._rgb = options.rgb;
      this._hex = options.hex;
      this._name = options.name;
    }
  }

  get rgb() {
    return this._rgb;
  }

  get hex() {
    return this._hex;
  }

  get name() {
    return this._name;
  }
}

export default Colors;
