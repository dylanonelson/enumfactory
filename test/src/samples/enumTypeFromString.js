import { createEnum, defineConstant } from '../../../dist/index.bundle.js';

const enumTypeFromString = () => createEnum(
  defineConstant('WHITE'),
  defineConstant('BLACK')
);

export default enumTypeFromString;
