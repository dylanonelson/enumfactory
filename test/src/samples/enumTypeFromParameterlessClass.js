import Colors from './Colors';
import { createEnum, defineConstant } from '../../../dist/index.bundle.js';

const enumTypeFromParameterlessClass = () => createEnum(Colors)(
  defineConstant('WHITE'),
  defineConstant('BLACK')
);

export default enumTypeFromParameterlessClass;
