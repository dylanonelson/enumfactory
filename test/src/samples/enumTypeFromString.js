import { Enum, defineConstant } from '../../../dist/index.bundle.js';

const enumTypeFromString = Enum(
  defineConstant('WHITE'),
  defineConstant('BLACK')
);

export default enumTypeFromString;
