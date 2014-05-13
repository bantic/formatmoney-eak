import {test} from 'ember-qunit';
import formatMoneyHelper from 'appkit/helpers/format-money';
import Money from 'appkit/utils/money';

module('helper:format-money');

function createView(template, context){
  if (!context) { context = {}; }

  var View = Ember.View.extend({
    controller: context,
    template: Ember.Handlebars.compile(template)
  });

  return View.create();
}

function append(view){
  Ember.run(function(){
    view.appendTo('#qunit-fixture');
  });
}

test('summarize currency', function() {
  var expected = [
    [new Money(0,'CAD'), '$0.00'],
    [new Money(27,'CAD'), '$0.27'],
    [new Money(366,'CAD'), '$4'],
    [new Money(89466, 'CAD'), '$895'],
    [new Money(340000, 'CAD'), '$3,400'],
    [new Money(3400000, 'CAD'), '$34.0k'],
    [new Money(340000000, 'CAD'), '$3.4m']
  ];

  expect(expected.length);

  Ember.A(expected).forEach(function(arr){
    var m = arr[0], val = arr[1];

    var view = createView("{{format-money m summarize=true}}",{m:m});
    append(view);
    equal(view.$().text(), val);
  });
});

test('default formatting of currency', function() {
  var expected = [
    [new Money(0,'CAD'), '$0.00'],
    [new Money(27,'CAD'), '$0.27'],
    [new Money(366,'CAD'), '$3.66'],
    [new Money(89466, 'CAD'), '$894.66'],
    [new Money(340000, 'CAD'), '$3,400.00'],
    [new Money(3400000, 'CAD'), '$34,000.00'],
    [new Money(340000000, 'CAD'), '$3,400,000.00']
  ];

  expect(expected.length);

  Ember.A(expected).forEach(function(arr){
    var m = arr[0], val = arr[1];

    var view = createView("{{format-money m}}",{m:m});
    append(view);
    equal(view.$().text(), val);
  });
});

test('handling of bad input', function() {
  expect(2);
  var view;

  view = createView("{{format-money m summarize=true}}",{m:3400});
  try {
    append(view);
  } catch(e) {
    ok(true, 'fails when money is not a Money');
  }

  view = createView("{{format-money m summarize=true}}",{m:'bad'});
  try {
    append(view);
  } catch(e) {
    ok(true, 'fails when money is a string');
  }
});
