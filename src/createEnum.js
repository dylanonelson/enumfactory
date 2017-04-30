import createEnumValue from './createEnumValue';
import createEnumType from './createEnumType';
import { objIsDefinedConstant } from './defineConstant';

const createEnum = (...enumArgs) => {
  if (enumArgs.length === 0)
    throw new Error(`Cannot create an enum type with no defined constants`);

  if (enumArgs.find(a => objIsDefinedConstant(a) === false))
    throw new Error(`Arguments to \`createEnum\` must be created with \`defineConstant\``);

  const createConstants = (classOrFunc, constants) => {
    const targetObj = {};
    let constantIndex = 0;
    const named = [];
    const values = [];

    // Default class to String
    classOrFunc = classOrFunc === null ? String : classOrFunc;

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
      console.log(named);
      if (named.includes(name))
        throw new Error(`Cannot define a constant for ${name} twice in the same enum`);

      named.push(name);

      let instance = null;

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

      if (typeof instance !== 'object') {
        throw new Error(`${classOrFunc && classOrFunc.name} did not return an object and therefore cannot be made into an enum`);
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
      console.log(config);
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

  return function instantiateEnumValues(classOrFunc = null) {
    return createConstants(classOrFunc, enumArgs);
  };
}

export default createEnum;
