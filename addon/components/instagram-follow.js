import Ember from 'ember';

export default Ember.Component.extend({
  socialApiClient: null, // injected

  tagName: 'a',

  username: null,   // The Instagram username of the account you would like the viewer to follow. Required.

  attributeBindings: ['linkTarget:target', 'href'],
  linkTarget: '_top',

  href: Ember.computed('username', function(){
    var intentUrl = 'https://www.instagram.com/';
    return intentUrl + encodeURIComponent(this.get('username'));
  }),

  trackClick: Ember.on('click', function() {
    this.socialApiClient.clicked({
      username: this.get('username'),
      componentName: 'instagram-follow'
    });
  })
});
