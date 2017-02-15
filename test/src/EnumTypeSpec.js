import { assert } from 'chai';

import { enumTypeFromClass, enumTypeFromString, Colors } from './samples';

var data = [
  {
    value: enumTypeFromClass,
    context: 'created with a class',
  },
  {
    value: enumTypeFromString,
    context: 'created with a string',
  },
];

var runTests = function(d) {
  var e = d.value;

  describe('An enum object', function() {
    context(d.context, function() {
      it('has a values method that returns its constants', function() {
        assert.strictEqual(e.values().length, 2);
        assert.strictEqual(e.values()[0], e.WHITE);
        assert.strictEqual(e.values()[1], e.BLACK);
      });

      it('has a valueOf method that returns the matching EnumValue', function() {
        assert.strictEqual(e.valueOf('WHITE'), e.WHITE);
      });

      it('exposes the names of its constants as enumerable properties', function() {
        assert.deepEqual(Object.keys(e), ['WHITE', 'BLACK']);
      })

      it('has keys for each constant', function() {
        assert.isDefined(e.WHITE);
        assert.isDefined(e.BLACK);
      });

      it('has a toString method that reflects its constant constructor', function() {
        assert.strictEqual(e.toString(), `Enum type ${e.WHITE.constructor.name}`);
      });
    });
  });

  describe('An enum constant', function() {
    context(d.context, function() {
      it('has an ordinal', function() {
        assert.strictEqual(e.WHITE.ordinal(), 0);
        assert.strictEqual(e.BLACK.ordinal(), 1);
      });

      it('has a name', function() {
        assert.strictEqual(e.WHITE.name(), 'WHITE');
        assert.strictEqual(e.BLACK.name(), 'BLACK');
      });

      it('can be used for comparison within contexts', function() {
        assert.notStrictEqual(e.WHITE, e.BLACK);
        assert.strictEqual(e.WHITE, e.WHITE);
      });

      it('throws errors when you try to access an undefined key', function() {
        assert.throw(function() { return e.RED });
      });

      it('throws errors when you try to reset existing properties on it', function() {
        assert.throw(function() { e.WHITE = 'MyConstant' });
      });

      it('throws errors when you try to set new properties on it', function() {
        assert.throw(function() { e.RED = 'MyConstant' });
      });

      switch (d.context) {
        case 'created with a class': {
          it('returns a value of the type passed to Enum when called', function() {
            assert.instanceOf(e.WHITE, Colors);
          });

          it('exposes the underlying properties of the object', function() {
            assert.strictEqual(Object.getPrototypeOf(e.WHITE).name, 'white');
          });

          break;
        }
        case 'created with a string': {
          it('returns a value of the type passed to Enum when called', function() {
            assert.instanceOf(e.WHITE, String);
          });

          break;
        }
        default: {
          // do nothing
        }
      }
    })
  });
};

data.forEach(function(d) {
  runTests(d);
});
