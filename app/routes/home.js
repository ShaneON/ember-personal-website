import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  media: service(),

  setupController(controller) {
    this._super(...arguments);
    controller.set('isDesktop', !this.media.isMobile),
    controller.set('header', 'header');
    this._checkScroll(controller);
  },

  _checkScroll(controller) {
    window.addEventListener('scroll', () => {
      let stickyPosition;
      if (this.media.isMobile) {
        stickyPosition = 70;
      }
      else {
        stickyPosition = 80;
      }
      let scrollPosition = Math.round(window.scrollY);
      if (scrollPosition > stickyPosition) {
        controller.set('header', 'sticky');
      } else {
        controller.set('header', 'header');
      }
    });
  },
});
