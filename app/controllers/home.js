import Controller from '@ember/controller';
import move from 'ember-animated/motions/move';
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';
import { easeExpIn, easeExpOut } from 'd3-ease';
import fade from 'ember-animated/transitions/fade';
import { wait } from 'ember-animated';
import { debounce } from '@ember/runloop';

export default Controller.extend({
  init() {
    this._super(...arguments);
    let start = Date.now();
    var self = this;

    const interval = setInterval(() => {
      this._slideshowInterval();
    }, 10000);
    this.set('slideshowInterval', interval);
  },

  *transitionMove({ duration, insertedSprites, removedSprites }) {
    for (let sprite of insertedSprites) {
      sprite.startAtPixel({ x: window.innerWidth });
      yield move(sprite, {
        duration: duration * (2 / 3),
        easing: easeExpIn,
      });
    }

    for (let sprite of removedSprites) {
      sprite.endAtPixel({ x: 0 - sprite.initialBounds.width });
      yield move(sprite, {
        duration: duration * (1 / 3),
        easing: easeExpOut,
      });
    }
  },

  *transitionFade(context) {

    let { duration, insertedSprites, removedSprites } = context;

    for (let sprite of removedSprites) {
      fadeOut(sprite);
    }

    for (let sprite of insertedSprites) {
      fadeIn(sprite);
    }
  },

  _slideshowInterval() {
    let count = this.currentSlideshowImg;
    if (count === 9) {
      this.set('currentSlideshowImg', 0);
    } else {
      this.set('currentSlideshowImg', this.currentSlideshowImg + 1);
    }
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

      if ((scrollTop + 20) > sectionItem.offsetTop && scrollTop < endItem.offsetTop) {
        navItem.classList.add('active');
        navItem.children[0].classList.remove('disabled');
        navItem.children[2].classList.remove('disabled');
      }
    })
  },

  currentSlideshowImg: 0,
  tiles: ['about', 'career', 'education', 'awards'],
  currentSection: 'about',
  isTileView: true,
  sections: ['about', 'tech', 'contact'],
  slideshowInterval: null,

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
      this.set('currentSection', tile);
    },

    tileSelectedMobile(tile) {
      if (this.isTileView) {
        this.set('isTileView', false);
        this.set('currentSection', tile);
      }
      else {
        this.send('closeAbout');
      }
    },

    closeAbout() {
      this.set('isTileView', true);
      this.set('currentSection', null);
    },

    changeSlideshowImage(imageNum) {
      this.set('currentSlideshowImg', imageNum);

      clearInterval(this.slideshowInterval);

      const interval = setInterval(() => {
        this._slideshowInterval();
      }, 10000);

      this.set('slideshowInterval', interval);
    }
  },
});
