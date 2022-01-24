import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  'did-insert'() {},

  didInsertElement() {
    this._super(...arguments);

    this.get('did-insert')();
  }
});
