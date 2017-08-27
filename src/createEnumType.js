function createEnumType(type) {
  return function (props) {
    return function Enum() {
      Object.defineProperties(this, props);
    };
  }
}

export default createEnumType;
