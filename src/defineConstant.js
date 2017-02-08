import check from 'check-types';

const defineConstant = (name) => {
  if (check.string(name) === false)
    throw new Error(`Cannot construct constant from argument type ${typeof name}`);

  const constantOptions = { name };

  const namedConstant = (...args) => {

    if (args.length === 0) {
      return constantOptions;

    } else {
      const namedConstantWithParameters = () =>
        Object.assign(constantOptions, { args });

      namedConstantWithParameters.__defined_constant__ = true;

      return namedConstantWithParameters;
    }
  }

  namedConstant.__defined_constant__ = true;

  return namedConstant;
};

export default defineConstant;
