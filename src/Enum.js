import check from 'check-types';
import EnumValue from './EnumValue';

const Enum = (...enumArgs) => {
  const classOrFunc = enumArgs[0];

  if (check.function(classOrFunc) === false)
    throw new Error(`Cannot construct enum from type ${typeof classOrFunc}`);

  const createConstants = (...constants) => {
    const o = {};
    let constantIndex = 0;
    const named = [];
    const values = [];

    const createConstant = (name, args) => {
      if (named.includes(name))
        throw new Error(`Cannot define a constant for ${name} twice in the same enum`);

      named.push(name);

      let instance = null;

      // No function provided
      if (classOrFunc.__defined_constant__) {

        // If there are any arguments, notify that they will not be processed
        if (args) {
          throw new Error(`Cannot process arguments ${args} without class or ` +
            'facory function');
        }

        instance = new String(name);
      }

      // ES6 class
      else if (/class/.test(classOrFunc.toString())) {
        try {
          instance = new classOrFunc(...args);
        } catch (e) {
          throw new Error('Error thrown while calling constructor ' +
            `${classOrFunc}: ${e}`);
        }
      }

      // Factory method
      else {
        try {
          instance = classOrFunc(...args);
        } catch (e) {
          throw new Error('Error thrown while calling function' +
            `${classOrFunc}: ${e}`);
        }
      }

      if (typeof instance !== 'object') {
        throw new Error(`${classOrFunc} did not return an object and therefore cannot be made into an enum`);
      }

      const enumValue = new EnumValue({
        ordinal: constantIndex++,
        name,
        value: instance,
      });

      values.push(enumValue);
      return enumValue;
    };

    constants.forEach(cf => {
      const c = cf();

      o[c.name] = createConstant(c.name, c.args);
      o.values = () => values;
      o.valueOf = (name) => values.find(v => v.name === name);
    });

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
  };

  // If args are defined constants, enumerate them
  if (classOrFunc.__defined_constant__)
    return createConstants(...enumArgs);

  // Otherwise, assume that the argument is a factory function or class and
  // return a function that accepts defined constants
  return createConstants;
}

export default Enum;
