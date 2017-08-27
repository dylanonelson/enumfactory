import { createEnum, defineConstant } from '../context';

const enumTypeFromString = () => createEnum(
  defineConstant('WHITE'),
  defineConstant('BLACK')
)();

export default enumTypeFromString;
