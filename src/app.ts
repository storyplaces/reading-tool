import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'StoryPlaces';

    config.map([
      { route: '', moduleId: 'components/story-list', title: 'Story List'}
    ])

    this.router = router;
  }
}
