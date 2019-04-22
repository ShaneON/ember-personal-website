import Route from '@ember/routing/route';

export default Route.extend({

  setupController(controller) {
    this._super(...arguments);
    controller.set('header', "header")
    this._checkScroll(controller);
  },

  _checkScroll(controller) {
    window.addEventListener('scroll', (() => {
      let scrollPosition = Math.round(window.scrollY);
      if (scrollPosition > 100){
        controller.set('header', "sticky");
      }
      else {
        controller.set('header', "header");
      }
    }));
  }


});
