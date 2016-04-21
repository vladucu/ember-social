import FacebookApiClient from '../services/facebook-api-client';
import InstagramApiClient from '../services/instagram-api-client';
import LinkedinApiClient from '../services/linkedin-api-client';
import TwitterApiClient from '../services/twitter-api-client';

export default {
  name: 'ember-social-services',

  initialize: function(){
    let application = arguments[1] || arguments[0];

    application.register('service:facebook-api-client', FacebookApiClient);
    var facebookPluginComponents = ['facepile', 'like', 'share'];

    facebookPluginComponents.forEach(function(plugin) {
      application.inject('component:facebook-' + plugin, 'socialApiClient', 'service:facebook-api-client');
    });

    application.register('service:twitter-api-client', TwitterApiClient);
    var twitterComponents = ['share', 'follow', 'card'];
    twitterComponents.forEach(function(buttonType) {
      application.inject('component:twitter-' + buttonType, 'socialApiClient', 'service:twitter-api-client');
    });

    application.register('service:linkedin-api-client', LinkedinApiClient);
    application.inject('component:linkedin-share', 'socialApiClient', 'service:linkedin-api-client');

    application.register('service:instagram-api-client', InstagramApiClient);
    application.inject('component:instagram-follow', 'socialApiClient', 'service:instagram-api-client');
  }
};
