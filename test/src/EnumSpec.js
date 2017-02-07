import { assert } from 'chai';
import { Enum, constant } from '../../dist/index.bundle.js';

import Colors from './Colors';

describe('Enum', function() {
  it('is a function', function() {
    assert.typeOf(Enum, 'function');
  });

  it('throws an error if called with an argument that is not a function', function() {
    assert.throws(function() { Enum(null) });
    assert.doesNotThrow(function () { Enum() });
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
    assert.throw(() => Enum()(
      constant('ALPHA'),
      constant('ALPHA')
    ));
  });
});

describe('An enum object', function() {
  it ('has a values method that returns its constants', function() {
    var a = [constant('ALPHA'), constant('BETA')];
    var e = Enum()(...a);

    assert.strictEqual(e.values().length, 2);
    assert.strictEqual(e.values()[0], e.ALPHA);
    assert.strictEqual(e.values()[1], e.BETA);
  });
  context('created without a class or factory', function() {
    var a = [constant('ALPHA'), constant('BETA')];
    var e = Enum()(...a);

    it('throws errors when you pass arguments to it', function() {
      assert.throw(() => Enum()(
        constant('ALPHA')('α'),
        constant('BETA')('β')
      ));
      assert.throw(() => Enum()(
        constant('ALPHA')({ char: 'α' })
      ));
    });

    it('has keys for each constant', function() {
      assert.isDefined(e.ALPHA);
      assert.isDefined(e.BETA);
    });

    it('throws errors when you try to access an undefined key', function() {
      assert.throw(function() { return e.OMEGA });
    });

    it('can be used for comparison within contexts', function() {
      assert.notStrictEqual(e.ALPHA, e.BETA);
      assert.strictEqual(e.ALPHA, e.ALPHA);
    });
  });

  context('created with a class', function() {
    var a = [
      constant('WHITE')({ hex: '#fff', name: 'white' }),
      constant('BLACK')({ hex: '#000', name: 'black' }),
    ];
    var e = Enum(Colors)(...a);

    it('has keys for each constant', function() {
      assert.isDefined(e.WHITE);
      assert.isDefined(e.BLACK);
    });

    it('throws errors when you try to access an undefined key', function () {
      assert.throw(function() { return e.PURPLE });
    });

    it('can be used for comparison within contexts', function() {
      assert.notStrictEqual(e.WHITE, e.BLACK);
      assert.strictEqual(e.WHITE, e.WHITE);
    });

    it('contains instances of the class passed to it', function() {
      assert.instanceOf(e.WHITE, Colors);
    });
  });
});

describe('Enum constants', function() {
  var a = [
    constant('WHITE')({ hex: '#fff', name: 'white' }),
    constant('BLACK')({ hex: '#000', name: 'black' }),
  ];
  var e = Enum(Colors)(...a);

  it('have an ordinal method', function() {
    assert.strictEqual(e.WHITE.ordinal(), 0);
    assert.strictEqual(e.BLACK.ordinal(), 1);
  });

  it('have a name method', function() {
    assert.strictEqual(e.WHITE.name(), 'WHITE');
    assert.strictEqual(e.BLACK.name(), 'BLACK');
  });
});
