var assert = require('chai').assert;
var Enum = require('../../dist/bundle.js');

describe('Enum', function() {
  it('is a function', function() {
    assert.typeOf(Enum, 'function');
  });

  it('throws an error if called without arguments', function() {
    assert.throw(Enum);
  });

  it('returns an object if called with an object', function() {
    var obj = Enum({ TEST: 'test' });
    assert.isObject(obj);
  });

  it('returns an object if called with an array', function() {
    var obj = Enum(['TEST']);
    assert.isObject(obj);
  });
});

describe('An enum object', function() {
  context('created with an object', function() {
    var e = null;
    var f = null;
    var a = {
      'ALPHA': ['a'],
      'BETA': ['b'],
    };

    before('instantiate test enum', function() {
      e = Enum(a);
      f = Enum(a);
    });

    it('has keys for each constant', function() {
      Object.keys(a).forEach(k => assert.isDefined(e[k]));
    });

    it('throws errors when you try to access an undefined key', function () {
      assert.throw(function() { return e.OMEGA });
    });

    it('can be used for comparison across contexts', function() {
      assert.notStrictEqual(e.ALPHA, f.BETA);
      assert.strictEqual(e.ALPHA, f.ALPHA);
    });
  });

  context('created with an array', function() {
    var e = null;
    var f = null;
    var a = ['ALPHA', 'BETA', 'GAMMA'];

    before('instantiate test enums', function() {
      e = Enum(a);
      f = Enum(a);
    });

    it('has keys for each constant', function() {
      a.forEach(k => assert.isDefined(e[k]));
    });

    it('throws errors when you try to access an undefined key', function () {
      assert.throw(function() { return e.OMEGA });
    });

    it('can be used for comparison across contexts', function() {
      assert.notStrictEqual(e.ALPHA, f.BETA);
      assert.strictEqual(e.ALPHA, f.ALPHA);
    });
  });
});
