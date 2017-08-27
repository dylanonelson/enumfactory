import Colors from './Colors';
import { createEnum, defineConstant } from '../context';

const enumTypeFromParameterlessClass = () => createEnum(
  defineConstant('WHITE'),
  defineConstant('BLACK')
)(Colors);

export default enumTypeFromParameterlessClass;
