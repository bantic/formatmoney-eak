var get = Ember.get;

/**
 * A class for managing money
 *
 * @class Money
 */
var Money = Ember.Object.extend({

  /**
   * Number of cents in the selected currency
   *
   * @property cents
   * @type {Integer}
   *
   */
  cents: null,

  /**
   * Three letter currency code
   *
   * @property code
   * @type {String}
   *
   */
  code:  null,

  dollars: function(){
    return this.get('cents') / 100;
  }.property('cents'),

  /**
   * Instantiate a money object. For example:
   *
   *   var cost = new Money(2400, 'GBP');
   *
   * @method toString
   * @param {Number} cents
   * @param {String} code
   * @constructor
   */
  init: function(cents, code){
    if (typeof code !== 'string') {
      throw new Error("Money must be instantiated with a code.");
    }
    this.set('code', code);

    if (Number(cents) !== parseInt(cents, 10)) {
      throw new Error("Money must be instantiated with number of cents.");
    }
    this.set('cents', parseInt(cents, 10));
  },

  /**
   * Subtract a money object from this one.
   *
   *   var cost     = new Money(2400, 'GBP'),
   *       discount = new Money(1212, 'GBP');
   *
   *   var diff = cost.subtract(discount);
   *   diff.get('cents'); // => 1188
   *
   * Returns a new money object, does not alter either
   * original value.
   *
   * @method subtract
   * @param {Money} less the money to subtract
   * @return {Money}
   */
  subtract: function(less){
    var cents = this.get('cents'),
        code  = this.get('code'),
        lessCents = less.get('cents'),
        lessCode  = less.get('code');

    if (code !== lessCode) {
      throw new Error("Money object with code " + lessCode + " cannot be subtracted from money with code " + code);
    }
    return new Money(cents - lessCents, code);
  }
});

Money.prototype.constructor = Money;
Money.reopenClass({

  /**
   * Deserialize money from a persisted structure
   *
   * @method deserialize
   * @param {Object} data
   * @return {Money}
   */
  deserialize: function(data){
    var cents = get(data, 'amount'),
        code  = get(data, 'code');
    return new Money(cents, code);
  },

  /**
   * Serialize a money object for persistence
   *
   * @method serialize
   * @param {Money} money
   * @return {Object}
   */
  serialize: function(money){
    var amount = get(money, 'cents'),
        code   = get(money, 'code');
    return {
      amount: amount,
      code:   code
    };
  }

});

export default Money;
