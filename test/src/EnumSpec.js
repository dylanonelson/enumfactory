import { assert } from 'chai';
import { defineConstant, Enum, EnumValue } from '../../dist/index.bundle.js';

import { Colors } from './samples';

describe('Enum', function() {
  it('is a function', function() {
    assert.typeOf(Enum, 'function');
  });

  it('throws an error if called with an argument that is not a function', function() {
    assert.throws(function() { Enum(null) });
  });

  it('returns a function when called with a function', function() {
    var one = 1;
    var func = Enum(() => { one });
    assert.isFunction(func);
  });

  it('returns a function when called with a class', function() {
    var func = Enum(Colors);
    assert.isFunction(func);
  });

  it('throws an error if you try to define the same constant twice', function() {
    assert.throw(() => Enum(
      defineConstant('ALPHA'),
      defineConstant('ALPHA')
    ));
  });

  it('throws errors when you pass arguments to it without a class', function() {
    assert.throw(() => Enum(
      defineConstant('ALPHA')('α'),
      defineConstant('BETA')('β')
    ));
    assert.throw(() => Enum(
      defineConstant('ALPHA')({ char: 'α' })
    ));
  });
});
