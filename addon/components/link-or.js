import Ember from 'ember';
import layout from '../templates/components/link-or';

const { inject:
        { service },
        computed,
        getOwner,
        isEmpty,
        assign,
        assert,
        set,
        get
      } = Ember;

export default Ember.Component.extend({
  layout,
  screen: service(),
  routing: service('-routing'),
  /**
  * MQ triggers link at below the value.
  * aka at screen <= 768px, generate link
  */
  _mqs: {
    xsmall: 768,
    small: 992,
    medium: 1200
  },

  tagName: 'a',
  size: 'xsmall',
  route: null,
  routeArgs: null,
  linkText: null,
  component: null,
  componentArg: null,
  showComponent: false,

  init() {
    this._super(...arguments);
    // let appConfig = getOwner(this).lookup('config:environment');
    // let appDefaults = (isEmpty(appConfig['ember-link-or'])) ? appConfig['ember-link-or'] : {} ;
    // let mq = this.get('_mqs');
    // assign(mq, appDefaults);
    // set(this, '_mqs', mq);
    assert('Must provide a valid route', this.get('route'));
    assert('Must provide a valid component', this.get('component'));
  },

  triggerSize: computed('size', function() {
    let trigger = this.get('size');
    let value = parseInt(trigger);

    if (!isNaN(value)) {
      return value;
    }

    let map = this.get('_mqs');

    return map[trigger];
  }),

  isLink: computed('triggerSize', 'screen.width', 'size', function() {
    let screenSize = this.get('screen.width');
    return (this.get('triggerSize') >= screenSize);
  }),

  click(e) {
    if (this.get('isLink')) {
      console.log('Im like "Hey, whats up? Hello"');
      this.get('router').transitionTo(this.get('route'), this.get('routeArgs'));
    }

    if (this.get('showComponent')) {

      if (this.$().is(e.target)) {
        this.set('showComponent', false);
      }

    } else {
      this.set('showComponent', true);
    }
  }

});
