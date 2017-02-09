import { assert } from 'chai';
import { defineConstant, Enum, EnumValue } from '../../dist/index.bundle.js';

import Colors from './Colors';

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
});

describe('An enum object', function() {
  it ('has a values method that returns its constants', function() {
    var a = [defineConstant('ALPHA'), defineConstant('BETA')];
    var e = Enum(...a);

    assert.strictEqual(e.values().length, 2);
    assert.strictEqual(e.values()[0], e.ALPHA);
    assert.strictEqual(e.values()[1], e.BETA);
  });

  it('has a valueOf method that returns the matching EnumValue', function() {
    var a = [defineConstant('ALPHA'), defineConstant('BETA')];
    var e = Enum(...a);

    assert.strictEqual(e.valueOf('BETA'), e.BETA);
  });

  context('created without a class or factory', function() {
    var a, e;

    before('set up test enums', function() {
      a = [defineConstant('ALPHA'), defineConstant('BETA')];
      e = Enum(...a);
    });

    it('throws errors when you pass arguments to it', function() {
      assert.throw(() => Enum(
        defineConstant('ALPHA')('α'),
        defineConstant('BETA')('β')
      ));
      assert.throw(() => Enum(
        defineConstant('ALPHA')({ char: 'α' })
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

    it('reflects that it\'s an enum when converted to a string', function() {
      assert.strictEqual(e.ALPHA.toString(), 'Enum ALPHA');
    });
  });

  context('created with a class', function() {
    var a, e;

    before('set up test enums', function() {
      a = [
        defineConstant('WHITE')({ hex: '#fff', name: 'white' }),
        defineConstant('BLACK')({ hex: '#000', name: 'black' }),
      ];
      e = Enum(Colors)(...a)
    });

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

    it('reflects that it\'s an enum when converted to a string', function() {
      assert.strictEqual(e.WHITE.toString(), 'Enum WHITE');
    });
  });
});

describe('An enum constant', function() {
  context('created with a class', function() {
    var a, e;

    before('set up test enums', function() {
      a = [
        defineConstant('WHITE')({ hex: '#fff', name: 'white', rgb: 'rgb(255,255,255)' }),
        defineConstant('BLACK')({ hex: '#000', name: 'black', rgb: 'rgb(0,0,0)' }),
      ];
      e = Enum(Colors)(...a);
    });

    it('is a function', function() {
      assert.isFunction(e.WHITE, EnumValue);
    });

    it('has an ordinal', function() {
      assert.strictEqual(e.WHITE.ordinal, 0);
      assert.strictEqual(e.BLACK.ordinal, 1);
    });

    it('has a name', function() {
      assert.strictEqual(e.WHITE.name, 'WHITE');
      assert.strictEqual(e.BLACK.name, 'BLACK');
    });

    it('returns a value of the type passed to Enum when called', function() {
      assert.instanceOf(e.WHITE(), Colors);
    });

    it('exposes underlying properties of the object', function() {
      assert.strictEqual(e.WHITE().name, 'white');
    });
  });

  context('created without a class', function() {
    var a = [defineConstant('WHITE'), defineConstant('BLACK')];
    var e = Enum(...a);

    it('is a function', function() {
      assert.isFunction(e.WHITE);
    });

    it('has an ordinal', function() {
      assert.strictEqual(e.WHITE.ordinal, 0);
      assert.strictEqual(e.BLACK.ordinal, 1);
    });

    it('has a name', function() {
      assert.strictEqual(e.WHITE.name, 'WHITE');
      assert.strictEqual(e.BLACK.name, 'BLACK');
    });

    it('has a value, which is of type String', function() {
      assert.instanceOf(e.WHITE(), String);
    });

    it('exposes underlying properties of the object', function() {
      assert.strictEqual(e.WHITE().length, 5);
    });
  });
});
