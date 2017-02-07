import check from 'check-types';

const constant = (name) => {
  if (check.string(name) === false)
    throw new Error(`Cannot construct constant from argument type ${typeof name}`);

  const constantOptions = { name };

  return (...args) => {
    if (args.length === 0) {
      return Object.assign(constantOptions, {
        args: args,
      });
    } else {
      return () => Object.assign(constantOptions, { args });
    }
  }
};

export default constant;
