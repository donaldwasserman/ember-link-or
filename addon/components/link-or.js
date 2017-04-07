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
        get,
        runInDebug
      } = Ember;

export default Ember.Component.extend({
  layout,
  screen: service(),
  _routing: service('-routing'),
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
  routeName: null,
  routeArgs: null,
  queryParams: null,
  linkText: null,
  component: null,
  componentArg: null,
  showComponent: false,

  currentWhen: null,
  activeClass: 'active',

  attributeBindings: ['href'],
  classNameBindings: ['active'],

  init() {
    this._super(...arguments);
    // let appConfig = getOwner(this).lookup('config:environment');
    // let appDefaults = (isEmpty(appConfig['ember-link-or'])) ? appConfig['ember-link-or'] : {} ;
    // let mq = this.get('_mqs');
    // assign(mq, appDefaults);
    // set(this, '_mqs', mq);
    assert('Must provide a valid route', this.get('routeName'));
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

  /**
   * Most of this is munged from the exisitng ember {{link-to}} components
   * I couldn't extend the component becuase the arguments I needed here are more dynamic
   * and link-to uses positional params.
   * @see https://github.com/emberjs/ember.js/blob/v2.12.0/packages/ember-glimmer/lib/components/link-to.js
   *
  **/
  resolvedQueryParams: computed('queryParams', function() {
    let resolvedQueryParams = {};
    let queryParams = get(this, 'queryParams');

    if (!queryParams) { return resolvedQueryParams; }

    let values = queryParams.values;
    for (let key in values) {
      if (!values.hasOwnProperty(key)) { continue; }
      resolvedQueryParams[key] = values[key];
    }

    return resolvedQueryParams;
  }),

  href: computed('routeName', 'routeArgs', 'resolvedQueryParams', 'isLink', function() {
    if (this.get('tagName') !== 'a') {
        return;
    }

    if (!this.get('isLink')) {
      return '#';
    }

    let routing = this.get('_routing');
    let routeName = this.get('routeName'),
        routeArgs = this.get('routeArgs'),
        resolvedQueryParams = this.get('resolvedQueryParams');

    runInDebug(() => {
      try {
        routing.generateURL(routeName, routeArgs, resolvedQueryParams);
      } catch (e) {
        assert('You attempted to define a `{{link-or "' + routeName + '"}}` but did not pass the parameters required for generating its dynamic segments. ' + e.message);
      }
    });

    return routing.generateURL(routeName, routeArgs, resolvedQueryParams);
  }),

  active: computed('_routing.currentState', function() {
    let currentState = get(this, '_routing.currentState');
    if (!currentState) { return false; }

    return this._computeActive(currentState);
  }),

    // Mostly C&P From e
  _computeActive(routerState) {
    let routing = get(this, '_routing');
    let args = get(this, 'routeArgs');

    args = (!args) ? [] : [args];

    let resolvedQueryParams = get(this, 'resolvedQueryParams');

    let currentWhen = get(this, 'currentWhen');
    currentWhen = currentWhen || get(this, 'routeName');
    currentWhen = currentWhen.split(' ');
    let isCurrentWhenSpecified = !!currentWhen;

    for (let i = 0; i < currentWhen.length; i++) {
      if (routing.isActiveForRoute(args, resolvedQueryParams, currentWhen[i], routerState, isCurrentWhenSpecified)) {
        return get(this, 'activeClass');
      }
    }
    return false;
  },

  click(e) {
    // Handle click events on link itself
    if (this.$().is(e.target)) {
      if (!this.get('isLink')) {
        e.preventDefault();
        this.toggleProperty('showComponent');
      }

    }
  }

});
