import Money from '../utils/money';

var moneys = {
  'money0': new Money(0, 'CAD'),
  'money27': new Money(27, 'CAD'),
  'money366': new Money(366, 'CAD'),
  'money89466': new Money(89466, 'CAD'),
  'money340000': new Money(340000, 'CAD'),
  'money3400000': new Money(3400000, 'CAD'),
  'money340000000': new Money(340000000, 'CAD')
};

export default Ember.Controller.extend({
  setupMoneys: function(){
    var ctl = this;

    Ember.keys(moneys).forEach(function(key){
      var money = moneys[key];
      var propName = key;

      ctl.set(propName, money);
    });
  }.on('init')
});
