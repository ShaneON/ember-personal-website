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
      if (count === 4) {
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

  scrollListener: window.addEventListener('scroll', () => {
    var navBar = document.getElementsByClassName('nav-bar')[0];
    var navItems = navBar.children;
    var container = document.getElementsByTagName('html')[0];
    var scrollTop = container.scrollTop;

    var aboutNav = document.getElementById('nav-about');
    var techNav = document.getElementById('nav-tech');
    var cvNav = document.getElementById('nav-cv');
    var contactNav = document.getElementById('nav-contact');

    var aboutSection = document.getElementById('about');
    var techSection = document.getElementById('tech');
    var cvSection = document.getElementById('cv');
    var contactSection = document.getElementById('contact');

    console.log('scrolltop = ' + scrollTop);
    console.log('techSection = ' + techSection);

    let navItem;
    navItem = document.getElementById('nav-about');
    if (navItem.className.includes("active")) {
      navItem.classList.remove('active');
      navItem.children[0].classList.add('disabled');
      navItem.children[2].classList.add('disabled');
    }
    navItem = document.getElementById('nav-tech');
    if (navItem.className.includes("active")) {
      navItem.classList.remove('active');
      navItem.children[0].classList.add('disabled');
      navItem.children[2].classList.add('disabled');
    }
    navItem = document.getElementById('nav-cv');
    if (navItem.className.includes("active")) {
      navItem.classList.remove('active');
      navItem.children[0].classList.add('disabled');
      navItem.children[2].classList.add('disabled');
    }
    navItem = document.getElementById('nav-contact');
    if (navItem.className.includes("active")) {
      navItem.classList.remove('active');
      navItem.children[0].classList.add('disabled');
      navItem.children[2].classList.add('disabled');
    }
    if ((scrollTop + 75) < techSection.offsetTop) {
      aboutNav.classList.add('active');
      aboutNav.children[0].classList.remove('disabled');
      aboutNav.children[2].classList.remove('disabled');
    }
    else if ((scrollTop + 75) < cvSection.offsetTop) {
      techNav.classList.add('active');
      techNav.children[0].classList.remove('disabled');
      techNav.children[2].classList.remove('disabled');
    }
    else if ((scrollTop + 75) < contactSection.offsetTop) {
      cvNav.classList.add('active');
      cvNav.children[0].classList.remove('disabled');
      cvNav.children[2].classList.remove('disabled');
    }
    else if ((scrollTop + 75) > contactSection.offsetTop) {
      contactNav.classList.add('active');
      contactNav.children[0].classList.remove('disabled');
      contactNav.children[2].classList.remove('disabled');
    }
  }),

  transitionFade: fade,

  imgCount: 0,
  technologies: ['HTML5/Javascript/CSS3', 'Ember.js Frontend Development', 'Java/Spring Server-Side Development', 'Node.js/Express Server-Side Development', 'Android Development'],
  currentTech: 'HTML5/Javascript/CSS3',

  actions: {
    navigateToSection(section) {
      let navItem = document.getElementById(section);
      navItem = document.getElementById(section.replace('nav-', ''));
      navItem.scrollIntoView();
    }
  },

});
