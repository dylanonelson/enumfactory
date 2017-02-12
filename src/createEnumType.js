function createEnumType(type) {
  return new Function('props',
    `return function Enumerated${type.name}() {
      Object.defineProperties(this, props);
    }`
  );
}

export default createEnumType;
