import 'proxy-polyfill';
import { assert } from 'chai';

const Enum = (constants, classFunc) => {
  try { assert.isObject(constants); }
  catch (e) { assert.isArray(constants); }

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
