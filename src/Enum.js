import check from 'check-types';
import createEnumValue from './createEnumValue';
import createEnumType from './createEnumType';

const Enum = (...enumArgs) => {
  const classOrFunc = enumArgs[0];

  if (check.function(classOrFunc) === false)
    throw new Error(`Cannot construct enum from type ${typeof classOrFunc}`);

  const createConstants = (...constants) => {
    const targetObj = {};
    let constantIndex = 0;
    const named = [];
    const values = [];

    const proxyProto = new Proxy(targetObj, {
      get(target, property) {
        // Forward calls to methods such as #toString() to the object
        if (typeof property === 'symbol')
          return target[property];

        if (target[property] === undefined)
          throw new Error(`Value ${property} is not present in enum.`);

        return target[property];
      },
      set(target, property, value) {
        throw new Error('Cannot assign new members to enum type');
      },
    });

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

      // Constructor function
      else {
        try {
          instance = new classOrFunc(...args);
        } catch (e) {
          throw new Error('Error thrown while calling calling constructor ' +
            `${classOrFunc.name}: ${e}`);
        }
      }

      if (typeof instance !== 'object') {
        throw new Error(`${classOrFunc.name} did not return an object and therefore cannot be made into an enum`);
      }

      const enumValue = createEnumValue({
        ordinal: constantIndex++,
        name,
        value: instance,
      });

      values.push(enumValue);

      return enumValue;
    };

    constants.forEach(cf => {
      const c = cf();
      targetObj[c.name] = createConstant(c.name, c.args);
    });

    targetObj.values = () => values;
    targetObj.valueOf = (name) => values.find(v => v.name() === name);
    targetObj.toString = () => `Enum type ${values[0].constructor.name}`

    // Set up properties on the Enum type object so that the values will be
    // enumerable and exposed by Object.keys
    const proxyProps = values.reduce((memo, value) => {
      memo[value.name()] = {
        enumerable: true,
        value,
      };
      return memo;
    }, {});

    const enumTypeClass = createEnumType(classOrFunc)(proxyProps);
    enumTypeClass.prototype = proxyProto;
    return new enumTypeClass();
  };

  // If args are defined constants, enumerate them
  if (classOrFunc.__defined_constant__)
    return createConstants(...enumArgs);

  // Otherwise, assume that the argument is a factory function or class and
  // return a function that accepts defined constants
  return createConstants;
}

export default Enum;
