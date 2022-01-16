import Component from '@ember/component';

export default Component.extend({

  actions: {
    scrollToSection(section) {
      document.getElementById(section).scrollIntoView();
    }
  }
});
