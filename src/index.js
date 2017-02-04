import 'proxy-polyfill';
import check from 'check-types';

const Enum = (constants, classFunc) => {
  if ((check.object(constants) || check.array(constants)) === false)
    throw new Error(`Cannot construct enum from type ${typeof constants}`);

  const o = {};

  if (Array.isArray && Array.isArray(constants)) {
    constants.forEach(k => o[k] = k);
  } else {
    Object.assign(o, constants);
  }

  const proxy = new Proxy(o, {
    get: (target, property) => {
      // Forward calls to methods such as #toString() to the object
      if (typeof property === 'symbol')
        return target[property];

      if (target[property] === undefined)
        throw new Error(`Value ${property} is not present in enum.`);

      return target[property];
    },
  });

  return Object.create(proxy);
}

// Use module.exports here because using es6 export syntax creates an export
// object with Enum as the value of a "default" key.
module.exports = Enum;
