const checkNodeEnv = () => (
  /* eslint-disable no-undef */
  (typeof process === 'object'
    && process.env
    && process.env.NODE_ENV
  ) || null
  /* eslint-enable no-undef */
);

const proxyIsDefined = () => (
  typeof Proxy === 'function'
);

export const enumShouldThrowErrors = () => {
  return checkNodeEnv() !== 'production' && proxyIsDefined() === true
};
