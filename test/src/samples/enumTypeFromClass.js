import { createEnum, defineConstant } from '../context';
import Colors from './Colors';

const enumTypeFromClass = () => createEnum(
  defineConstant('WHITE', { hex: '#fff', name: 'white', rgb: 'rgb(255,255,255)' }),
  defineConstant('BLACK', { hex: '#000', name: 'black', rgb: 'rgb(0,0,0)' })
)(Colors);

export default enumTypeFromClass;
