class Colors {
  constructor({ rgb, hex, name }) {
    this._rgb = rgb;
    this._hex = hex;
    this._name = name;
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
