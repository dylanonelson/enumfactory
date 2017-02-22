import { assert } from 'chai';
import { defineConstant, createEnum } from '../../dist/index.bundle.js';

import { Colors } from './samples';

describe('createEnum', function() {
  it('is a function', function() {
    assert.typeOf(createEnum, 'function');
  });

  it('throws an error if called with an argument that is not a function', function() {
    assert.throws(function() { createEnum(null) });
  });

  it('returns a function when called with a function', function() {
    var one = 1;
    var func = createEnum(() => { one });
    assert.isFunction(func);
  });

  it('returns a function when called with a class', function() {
    var func = createEnum(Colors);
    assert.isFunction(func);
  });

  it('throws an error if you try to define the same constant twice', function() {
    assert.throw(() => createEnum(
      defineConstant('ALPHA'),
      defineConstant('ALPHA')
    ));
  });

  it('throws errors when you pass arguments to it without a class', function() {
    assert.throw(() => createEnum(
      defineConstant('ALPHA')('α'),
      defineConstant('BETA')('β')
    ));
    assert.throw(() => createEnum(
      defineConstant('ALPHA')({ char: 'α' })
    ));
  });
});
