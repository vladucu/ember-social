import Ember from 'ember';

export default Ember.Component.extend({
  socialApiClient: null, // injected

  tagName: 'div', // set tagName to 'a' in handlebars to use your own css/content
                  // instead of the standard Twitter share button UI
  useWebIntent: Ember.computed.equal('tagName', 'a'),

  username: null,  // The Twitter username of the account you would like the viewer to follow.
                      // Required
  screenName: Ember.computed.alias('username'),
  userId: null, // The Twitter user identifier of the account you would like the viewer to follow.
                // Required using webIntent

  attributeBindings: ['webIntentUrl:href'],
  webIntentUrl: Ember.computed('useWebIntent', 'username', 'text', 'via', 'related', 'hashtags', function(){
    var intentUrl = 'https://twitter.com/intent/follow',
      intentParams = [],
      params = [
        {name: 'screen_name', value: this.get('screenName')},
        {name: 'user_id', value: this.get('userId')},
      ];

    if (!this.get('useWebIntent')) { return; }

    params.forEach(function(param) {
      if (param.value) {
        intentParams.push(param.name + '=' + encodeURIComponent(param.value));
      }
    });

    return intentUrl + '?' + intentParams.join('&');
  }),

  loadTwitterClient: Ember.on('didInsertElement', function() {
    var self = this;
    this.socialApiClient.load().then(function(twttr) {
      if (self._state !== 'inDOM') { return; }
      self.twttr = twttr;
      self.trigger('twitterLoaded');
    });
  }),

  createTwitterFollowButton: Ember.on('twitterLoaded', function() {
    if (this.get('useWebIntent')) { return; }
    var username = this.get('username');
    if (username) {
      this.twttr.widgets.createFollowButton(
        username,
        this.get('element'),
        {
          // todo: options
        }).then(function (/*el*/) {
          Ember.Logger.debug('Twitter Follow Button created.');
        }
      );
    }
  })
});
