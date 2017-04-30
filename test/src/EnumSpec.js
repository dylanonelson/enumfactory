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

  it('throws an error when called without arguments', function() {
    assert.throws(function() { createEnum() });
  });

  it('throws an error if you try to define the same constant twice', function() {
    assert.throw(() => createEnum(
      defineConstant('ALPHA'),
      defineConstant('ALPHA')
    )());
  });

  it('throws an error if you pass arguments without a class or constructor function', function() {
    assert.throw(() => createEnum(
      defineConstant('ALPHA', 'a')
    )());
  });
});
