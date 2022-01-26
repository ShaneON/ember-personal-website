import Controller from '@ember/controller';
import move from 'ember-animated/motions/move';
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';
import { easeExpIn, easeExpOut } from 'd3-ease';
import fade from 'ember-animated/transitions/fade';
import { wait } from 'ember-animated';

export default Controller.extend({
  init() {
    this._super(...arguments);
    let start = Date.now();
    var self = this;

    setInterval(() => {
      this._slideshowInterval();
    }, 10000);
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

  *fadeOutTiles({ duration, insertedSprites, removedSprites, keptSprites }) {
    // for (let sprite of insertedSprites) {
    //   sprite.startAtPixel({ x: window.innerWidth });
    //   move(sprite, {
    //     duration: duration * (1 / 2),
    //     easing: easeExpIn,
    //   });
    // }

    console.log(keptSprites)

    for (let sprite of removedSprites) {
      yield fadeOut(sprite);
    }

    for (let sprite of keptSprites) {
      sprite.endAtSprite({otherSprite: removedSprites[0]});
      move(sprite);
    }
  },

  _slideshowInterval() {
    let count = this.imgCount;
    if (count === 4) {
      this.set('imgCount', 0);
    } else {
      this.set('imgCount', this.imgCount + 1);
    }
    this.set('currentTech', this.technologies[this.imgCount]);
  },

  _scrollToSection() {
    var scrollTop = document.getElementsByTagName('html')[0].scrollTop;
    let sections = this.get('sections');

    sections.forEach((section) => {
      var navItem = document.getElementById('nav-' + section);
      var sectionItem = document.getElementById(section);
      var endItem = document.getElementById(section + '-end');

      if (navItem.className.includes("active")) {
        navItem.classList.remove('active');
        navItem.children[0].classList.add('disabled');
        navItem.children[2].classList.add('disabled');
      }

      if ((scrollTop + 1) > sectionItem.offsetTop && scrollTop < endItem.offsetTop) {
        navItem.classList.add('active');
        navItem.children[0].classList.remove('disabled');
        navItem.children[2].classList.remove('disabled');
      }
    })
  },

  transitionFade: fade,

  imgCount: 0,
  technologies: [
    'HTML5/Javascript/CSS3',
    'Ember.js Frontend Development',
    'Java/Spring Server-Side Development',
    'Node.js/Express Server-Side Development',
    'Android Development',
  ],
  tiles: ['about', 'career', 'education', 'awards'],
  currentTech: 'HTML5/Javascript/CSS3',
  // currentTile: 'about',
  currentSection: 'about',
  isTileView: true,
  sections: ['about', 'tech', 'cv', 'contact'],

  actions: {
    navigateToSection(section) {
      let navItem = document.getElementById(section);
      navItem = document.getElementById(section.replace('nav-', ''));
      navItem.scrollIntoView();
    },

    activateScrolling() {
      window.addEventListener('scroll', () => {
        this._scrollToSection()
      });
    },

    tileSelected(tile) {
      this.set('isTileView', !this.get('isTileView'));
      this.set('currentSection', tile);
    },
  },
});
