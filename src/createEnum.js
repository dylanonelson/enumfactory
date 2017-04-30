import check from 'check-types';
import createEnumValue from './createEnumValue';
import createEnumType from './createEnumType';
import { objIsDefinedConstant } from './defineConstant';

const createEnum = (...enumArgs) => {
  const classOrFunc = enumArgs[0];

  // First argument is neither a defined constant nor a valid factory
  if (
    check.function(classOrFunc) === false &&
    objIsDefinedConstant(classOrFunc) === false
  )
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
      if (objIsDefinedConstant(classOrFunc) === true) {

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
          if (args) {
            instance = new classOrFunc(...args);
          }
          else {
            instance = new classOrFunc();
          }
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

    constants.forEach(config => {
      targetObj[config.name] = createConstant(config.name, config.args);
    });

    targetObj.values = () => values;
    targetObj.valueOf = (name) => values.find(v => v.name() === name);
    targetObj.toString = () => `Enum type ${values[0].constructor.name}`;

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

  // If first arg is a defined constant, assume the same for the rest and
  // enumerate them
  if (objIsDefinedConstant(classOrFunc))
    return createConstants(...enumArgs);

  // Otherwise, assume that the argument is a factory function or class and
  // return a function that accepts defined constants
  return createConstants;
}

export default createEnum;
