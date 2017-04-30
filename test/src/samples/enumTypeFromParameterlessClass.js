import Colors from './Colors';
import { createEnum, defineConstant } from '../../../dist/index.bundle.js';

const enumTypeFromParameterlessClass = () => createEnum(
  defineConstant('WHITE'),
  defineConstant('BLACK')
)(Colors);

export default enumTypeFromParameterlessClass;
