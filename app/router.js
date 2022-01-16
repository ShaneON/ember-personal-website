import EmberRouter from '@ember/routing/router';
import config from 'ember-personal-website/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('home', { path: '/'});
  this.route('experience');
  this.route('contact');
  this.route('awards');
});
