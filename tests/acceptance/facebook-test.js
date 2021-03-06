import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Facebook', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('share', function() {
  visit('/facebook/share');

  andThen(function() {
    equal(currentPath(), 'facebook.share');

    var exampleElementIds = [
      'no-parameters',
      'custom-url',
      'layout-icon-link',
      'layout-box-count',
      'layout-button-count',
      'layout-button',
      'layout-link',
      'layout-icon'
    ];

    Ember.run.later(function() {
      exampleElementIds.forEach(function(exampleId) {
        equal(find('#' + exampleId + ' iframe').length, 1, 'Renders ' + exampleId);
      });

      equal(find('#tag-name-a a').length, 1, 'Renders anchor tag');
    }, 2500);
  });
});

test('like', function() {
  visit('/facebook/like');

  andThen(function() {
    equal(currentPath(), 'facebook.like');

    var exampleElementIds = [
      'no-parameters',
      'custom-url',
      'custom-action',
      'layout-standard',
      'layout-button-count',
      'layout-button',
      'layout-box-count'
    ];

    Ember.run.later(function() {
      exampleElementIds.forEach(function(exampleId) {
        equal(find('#' + exampleId + ' iframe').length, 1, 'Renders ' + exampleId);
      });
    }, 2500);
  });
});

test('facepile', function() {
  visit('/facebook/facepile');

  andThen(function() {
    equal(currentPath(), 'facebook.facepile');

    var exampleElementIds = [
      'no-parameters',
      'custom-url',
      'custom-colorscheme'
    ];

    Ember.run.later(function() {
      exampleElementIds.forEach(function(exampleId) {
        equal(find('#' + exampleId + ' iframe').length, 1, 'Renders ' + exampleId);
      });
    }, 2500);
  });
});
