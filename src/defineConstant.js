import check from 'check-types';

const defineConstant = (name, ...args) => {
  if (check.string(name) === false)
    throw new Error(`Cannot construct constant from argument type ${typeof name}`);

  const constantOptions = { name };

  constantOptions.meta = {
    ENUMFACTORY_CONSTANT_DEFINITION: true,
  };

  if (args.length === 0) {
    return constantOptions;
  }

  return Object.assign(constantOptions, { args });
};

const objIsDefinedConstant = (o) => (
  typeof o === 'object'
    && o.meta
    && o.meta.ENUMFACTORY_CONSTANT_DEFINITION === true
);

export { objIsDefinedConstant, defineConstant };
