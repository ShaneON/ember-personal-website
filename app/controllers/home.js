import Controller from '@ember/controller';
import move from 'ember-animated/motions/move';
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';
import { easeExpIn, easeExpOut } from 'd3-ease';
import fade from 'ember-animated/transitions/fade';

export default Controller.extend({
  init() {
    this._super(...arguments);
    let start = Date.now();

    setInterval(() => {
      let count = this.imgCount;
      if (count === 3) {
        this.set('imgCount', 0);
      } else {
        this.set('imgCount', this.imgCount + 1);
      }
      this.set('currentTech', this.get('technologies')[this.get('imgCount')])
    }, 4000);
  },

  *transitionMove({ duration, insertedSprites, removedSprites }) {
    for (let sprite of insertedSprites) {
      sprite.startAtPixel({ x: window.innerWidth });
      move(sprite, {
        duration: duration * (1 / 2),
        easing: easeExpIn,
      });
    }

    for (let sprite of removedSprites) {
      sprite.endAtPixel({ x: 0 - sprite.initialBounds.width });
      move(sprite, {
        duration: duration * (1 / 2),
        easing: easeExpOut,
      });
    }
  },

  transitionFade: fade,

  imgCount: 0,
  technologies: ['HTML5/Javascript/CSS3', 'Ember', 'Java/Spring', 'Node.js'],
  currentTech: 'HTML5/Javascript/CSS3'

});
