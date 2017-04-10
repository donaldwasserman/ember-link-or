import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';


const screenSizeStub = Ember.Service.extend({
  width: 770
});

const routingStub = Ember.Service.extend({
   isActiveForRoute() {
     return false;
   },
   currentState: false,
   generateURL(routeName) {
     return `/${routeName}`;
   }
});

moduleForComponent('click-or', 'Integration | Component | click or', {
  integration: true,
  beforeEach: function() {
    this.register('service:screen', screenSizeStub);
    this.register('service:-routing', routingStub);
    this.inject.service('screen', { as: 'screen' });
    this.inject.service('-routing', { as: '-routing' });
  }
});

/* TODO: figure out how to test HREF functionality
test('component renders with proper href functionality', function(assert) {
  this.render(hbs`
      {{#link-or routeName="dummy" component="test-component"}}Click Me{{/link-or}}
    `);
    assert.equal(this.$().text().trim(), 'Click Me', 'Block params should render');
    assert.equal(this.$().attr('href'), '#', 'href should equal # above media query');


    this.set('screen.width', 500);
    assert.equal(this.$().attr('href'), '/dummy', 'href should equal route at lower ones');
}); */

test('component handles click events and renders component', function(assert) {
  this.render(hbs`
      {{#link-or routeName="dummy" component="test-component"}}Click Me{{/link-or}}
    `);

  this.$().click();
  assert.ok(this.$().find('#passed-component'), 'passed component should render');

  this.$('#passed-component').click();
  assert.ok(this.$().find('#passed-component'), 'passed component should handle its own clicks');


});
