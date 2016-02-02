import Ember from 'ember';

export default Ember.Object.extend({
  /*
   * A tracking object implementing `shared(serviceName, payload)` and/or
   * `clicked(serviceName, payload)` can be set on this object, and will
   * be delegated to if present. Not all Facebook
   * components support these events in all configurations.
   */
  tracking: null, // optional injection


  clicked: function(payload) {
    var tracking = this.tracking;
    if (!tracking) { return; }
    if (tracking.clicked) {
      tracking.clicked('instagram-follow', payload);
    }
  },

  shared: function(payload) {
    var tracking = this.tracking;
    if (!tracking) { return; }
    if (tracking.shared) {
      tracking.shared('instagram-follow', payload);
    }
  }
});
