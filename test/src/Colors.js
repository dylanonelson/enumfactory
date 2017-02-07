class Colors {
  constructor({ rgb, hex }) {
    this._rgb = rgb;
    this._hex = hex;
  }

  get rgb() {
    return this._rgb;
  }

  get hex() {
    return this._hex;
  }
}

export default Colors;
