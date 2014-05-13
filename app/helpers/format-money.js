/*global numeral*/
import Money from '../utils/money';

/**
 * Ember HandleBars Helper for number/currency formatting.
 *
 * If summarize is set to true, it'll summarize the amount:
 *  - If the number is < $1: Show the full cents (e.g. $0.12)
 *  - If the number is < $10,000: Show the dollar amount, no cents (e.g. $17,
 *    $923, $9,327)
 *  - If the number is >= $10,000: Show abbreviated dollar amount, to 1 decimal
 *    place (e.g. $12.1k, $102.4k, $1.1m)
 *
 * @module Helper
 * @class formatMoneyHelper
 *
 */
export default Ember.Handlebars.registerBoundHelper('format-money', function(money, options) {
  var summarize = options.hash.summarize || false;
  var format = '$0,0.00';

  // Input must be a Money object.
  if (!(money instanceof Money)) {
    throw new Error("format-money helper must be given a Money object");
  }

  var dollars = money.get('dollars');

  if (summarize) {
    if (dollars < 1.00) {
      format = '$0.00';
    } else if (dollars < 10000.00) {
      format = '$0,0';
    } else {
      format = '$0,0.0a';
    }
  }

  return numeral(dollars).format(format);
});
