import Controller from '@ember/controller';
import move from 'ember-animated/motions/move';
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';
import { easeExpIn, easeExpOut } from 'd3-ease';

export default Controller.extend({

  init() {
    this._super(...arguments);
    let start = Date.now();

    setInterval(() => {
      let count = this.get('imgCount');
      if (count === 3) {
        this.set('imgCount', 0);
      }
      else {
        this.set('imgCount', this.get('imgCount') + 1);
      }
    }, 4000);
  },

  *transitionMove({ duration, insertedSprites, removedSprites }) {
    for(let sprite of insertedSprites) {
      sprite.startAtPixel({ x: window.innerWidth });
      move(sprite, {
        duration: duration * (1/2),
        easing: easeExpIn
      });
      // fadeIn(sprite);
    }

    for(let sprite of removedSprites) {
      sprite.endAtPixel({ x: 0 - sprite.initialBounds.width });
      move(sprite, {
        duration: duration * (1/2),
        easing: easeExpOut
      });
      // fadeOut(sprite);
    }
  },

  imgCount: 0,
});
