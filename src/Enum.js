import check from 'check-types';

const Enum = (classOrFunc) => {
  if (
    (classOrFunc !== undefined) &&
    (check.function(classOrFunc) === false)
  )
    throw new Error(`Cannot construct enum from type ${typeof classOrFunc}`);

  return (...constants) => {
    const o = {};
    let constantIndex = 0;
    const named = [];
    const values = [];

    const createConstant = (name, args) => {
      if (named.includes(name))
        throw new Error(`Cannot define a constant for ${name} twice in the same enum`);

      named.push(name);

      let instance = null;

      // no function provided
      if (classOrFunc === undefined) {

        // If there are any arguments, notify that they will not be processed
        if (args.length > 0)
          throw new Error(`Cannot process arguments ${args} without class or ` +
            'facory function');

        instance = {};
      }

      // es6 class
      else if (/class/.test(classOrFunc)) {
        try {
          instance = new classOrFunc(args);
        } catch (e) {
          throw new Error('Error thrown while calling constructor ' +
            `${classOrFunc}: ${e}`);
        }
      }

      // factory method
      else {
        try {
          instance = classOrFunc(args);
        } catch (e) {
          throw new Error('Error thrown while calling function' +
            `${classOrFunc}: ${e}`);
        }
      }

      if (typeof instance !== 'object') {
        throw new Error(`${classOrFunc} did not return an object and therefore cannot be made into an enum`);
      }

      instance.name = () => name;

      const index = constantIndex++;
      instance.ordinal = () => index;

      values.push(instance);
      return instance;
    };

    constants.forEach(cf => {
      const c = cf();

      o[c.name] = createConstant(c.name, c.args);
      o.values = () => values;
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

}

export default Enum;
