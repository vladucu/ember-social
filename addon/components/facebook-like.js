import Ember from 'ember';

export default Ember.Component.extend({
  socialApiClient: null, // injected

  url: null, // Defaults to current url
  'fb-layout': 'standard', // Valid options: 'standard', 'button_count', 'button', or 'box_count'
  'fb-action': 'like', // Valid options: 'like' or 'recommend'

  createFacebookLikeButton: Ember.on('didInsertElement', function() {
    var self = this;
    this.socialApiClient.load().then(function(FB) {
      // subscribe to Facebook Like event
      FB.Event.subscribe('edge.create', (url, html_element) => {
        self.socialApiClient.shared({
          url: url,
          html_element: html_element,
          componentName: 'facebook-like',
        });
      });

      if (self._state !== 'inDOM') { return; }
      var attrs = [];
      var url = self.get('url');
      if (url) {
        attrs.push('data-href="' + url + '"');
      }
      var fbLayout = self.get('fb-layout');
      if (fbLayout) {
        attrs.push('data-layout="' + fbLayout + '"');
      }
      var fbAction = self.get('fb-action');
      if (fbAction) {
        attrs.push('data-action="' + fbAction + '"');
      }
      self.$().html('<div class="fb-like" ' + attrs.join(' ') +'></div>');
      FB.XFBML.parse(self.get('element'));
    });
  })
});
