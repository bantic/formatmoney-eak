/* global findWithAssert */
import startApp from '../helpers/start-app';
var App;

module('Acceptance - Money', {
  setup: function(){
    App = startApp();
  },
  teardown: function(){
    Ember.run(App, 'destroy');
  }
});

test('shows me the money', function(){
  var expected = [
    ['.money27', '$0.27'],
    ['.money0',  '$0.00'],
    ['.money366',  '$3.66'],
    ['.money89466',  '$894.66'],
    ['.money340000',  '$3,400.00'],
    ['.money3400000',  '$34,000.00'],
    ['.money340000000',  '$3,400,000.00']
  ];
  expect(expected.length);

  return visit('/money').then(function(){

    Ember.A(expected).forEach(function(arr){
      var sel = arr[0],
          val = arr[1];

      equal( findWithAssert(sel).text().trim(),
             val,
             'Shows me the money for '+sel );
    });
  });
});

test('shows me the summarized money', function(){
  var expected = [
    ['.summarized-money27', '$0.27'],
    ['.summarized-money0',  '$0.00'],
    ['.summarized-money366',  '$4'],
    ['.summarized-money89466',  '$895'],
    ['.summarized-money340000',  '$3,400'],
    ['.summarized-money3400000', '$34.0k'],
    ['.summarized-money340000000', '$3.4m']
  ];

  //summarized-money340000
  expect(expected.length);

  return visit('/money').then(function(){

    Ember.A(expected).forEach(function(arr){
      var sel = arr[0],
          val = arr[1];

      equal( findWithAssert(sel).text().trim(),
             val,
             'Shows me the money for '+sel );
    });
  });
});
