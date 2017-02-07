import { assert } from 'chai';
import { constant } from '../../dist/index.bundle.js';

describe('Constant', function() {
  it('is a function', function() {
    assert.typeOf(constant, 'function');
  });

  it('throws an error if called without arguments', function() {
    assert.throw(constant);
  });

  it('throws an error if called with an argument besides a string', function() {
    assert.throw(() => constant(null));
    assert.throw(() => constant({ one: 1 }));
  });

  it('returns a function', function() {
    var result = constant('ALPHA');
    assert.isFunction(result);
  });

  context('called with one set of arguments', function() {
    it('returns an object', function() {
      var constantResult = constant('ALPHA')();
      assert.isObject(constantResult);
    });

    it('sets the name property on the object', function() {
      var constantResult = constant('ALPHA')();
      assert.strictEqual(constantResult.name, 'ALPHA');
    });
  });

  context('Constant called with two sets of arguments', function() {
    var constantResult = constant('ALPHA')(1, 2, 3)();

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
