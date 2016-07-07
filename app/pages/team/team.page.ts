import {Page} from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

@Page({
  templateUrl: 'build/pages/team/team-page.html'
})
export class TeamPage {
	results: Observable<any[]>;

  constructor(af: AngularFire) {
	  this.results = af.database.list('/results');
  }
}
