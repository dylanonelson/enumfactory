import { assert } from 'chai';
import { defineConstant } from './context';

describe('Constant', function() {
  it('is a function', function() {
    assert.typeOf(defineConstant, 'function');
  });

  it('throws an error if called without arguments', function() {
    assert.throw(defineConstant);
  });

  it('throws an error if called with an argument besides a string', function() {
    assert.throw(() => defineConstant(null));
    assert.throw(() => defineConstant({ one: 1 }));
  });

  it('returns an object', function() {
    var result = defineConstant('ALPHA');
    assert.isObject(result);
  });

  context('called with one set of arguments', function() {
    it('returns an object', function() {
      var constantResult = defineConstant('ALPHA');
      assert.isObject(constantResult);
    });

    it('sets the name property on the object', function() {
      var constantResult = defineConstant('ALPHA');
      assert.strictEqual(constantResult.name, 'ALPHA');
    });
  });

  context('Constant called with two sets of arguments', function() {
    var constantResult = defineConstant('ALPHA', 1, 2, 3);

    it('returns an object', function() {
      assert.isObject(constantResult);
    });

    it('sets the name property on the object', function() {
      assert.strictEqual(constantResult.name, 'ALPHA');
    });

    it('sets the arguments property on the object', function() {
      assert.deepEqual(constantResult.args, [1, 2, 3]);
    });
  });
});
