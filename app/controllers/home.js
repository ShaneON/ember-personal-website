import Controller from '@ember/controller';
import move from 'ember-animated/motions/move';
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';
import { easeExpIn, easeExpOut } from 'd3-ease';
import fade from 'ember-animated/transitions/fade';

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

  _slideshowInterval() {
    let count = this.imgCount;
    if (count === 4) {
      this.set('imgCount', 0);
    } else {
      this.set('imgCount', this.imgCount + 1);
    }
    this.set('currentTech', this.technologies[this.imgCount]);
  },

  // scrollListener: window.addEventListener('scroll', () => {
  //   var navBar = document.getElementsByClassName('nav-bar')[0];
  //   var navItems = navBar.children;
  //   var container = document.getElementsByTagName('html')[0];
  //   var scrollTop = container.scrollTop;
  //
  //   var aboutNav = document.getElementById('nav-about');
  //   var techNav = document.getElementById('nav-tech');
  //   var cvNav = document.getElementById('nav-cv');
  //   var contactNav = document.getElementById('nav-contact');
  //
  //   var aboutSection = document.getElementById('about');
  //   var techSection = document.getElementById('tech');
  //   var cvSection = document.getElementById('cv');
  //   var contactSection = document.getElementById('contact');
  //
  //   if (aboutNav.className.includes("active")) {
  //     aboutNav.classList.remove('active');
  //     aboutNav.children[0].classList.add('disabled');
  //     aboutNav.children[2].classList.add('disabled');
  //   }
  //   if (techNav.className.includes("active")) {
  //     techNav.classList.remove('active');
  //     techNav.children[0].classList.add('disabled');
  //     techNav.children[2].classList.add('disabled');
  //   }
  //   if (cvNav.className.includes("active")) {
  //     cvNav.classList.remove('active');
  //     cvNav.children[0].classList.add('disabled');
  //     cvNav.children[2].classList.add('disabled');
  //   }
  //   if (contactNav.className.includes("active")) {
  //     contactNav.classList.remove('active');
  //     contactNav.children[0].classList.add('disabled');
  //     contactNav.children[2].classList.add('disabled');
  //   }
  //   if ((scrollTop) < techSection.offsetTop) {
  //     aboutNav.classList.add('active');
  //     aboutNav.children[0].classList.remove('disabled');
  //     aboutNav.children[2].classList.remove('disabled');
  //   }
  //   else if ((scrollTop + 100) < cvSection.offsetTop) {
  //     techNav.classList.add('active');
  //     techNav.children[0].classList.remove('disabled');
  //     techNav.children[2].classList.remove('disabled');
  //   }
  //   else if ((scrollTop) < contactSection.offsetTop) {
  //     cvNav.classList.add('active');
  //     cvNav.children[0].classList.remove('disabled');
  //     cvNav.children[2].classList.remove('disabled');
  //   }
  //   else if ((scrollTop) > contactSection.offsetTop) {
  //     contactNav.classList.add('active');
  //     contactNav.children[0].classList.remove('disabled');
  //     contactNav.children[2].classList.remove('disabled');
  //   }
  //   console.log('scrollTop = ' + scrollTop);
  //   console.log('contact offsetTop = ' + contactSection.offsetTop);
  // }),

  _scrollToSection() {
    console.log('scrolling');
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
  currentTile: 'about',
  currentSection: 'about',
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

    changeTile(tile) {
      this.set('currentTile', tile);
    },
  },
});
