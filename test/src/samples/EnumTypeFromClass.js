import { createEnum, defineConstant } from '../../../dist/index.bundle.js';
import Colors from './Colors';

const enumTypeFromClass = () => createEnum(Colors)(
  defineConstant('WHITE')({ hex: '#fff', name: 'white', rgb: 'rgb(255,255,255)' }),
  defineConstant('BLACK')({ hex: '#000', name: 'black', rgb: 'rgb(0,0,0)' })
);

export default enumTypeFromClass;
