export default {
  name: 'ember-social-services',
  initialize: function(container, application){
    var facebookPluginComponents = ['facepile', 'like', 'share'];

    facebookPluginComponents.forEach(function(plugin) {
      application.inject('component:facebook-' + plugin, 'socialApiClient', 'service:facebook-api-client');
    });

    var twitterComponents = ['share', 'follow'];
    twitterComponents.forEach(function(buttonType) {
      application.inject('component:twitter-' + buttonType, 'socialApiClient', 'service:twitter-api-client');
    });

    application.inject('component:linkedin-share', 'socialApiClient', 'service:linkedin-api-client');

    application.inject('component:twitter-card', 'socialApiClient', 'service:twitter-api-client');
  }
};
