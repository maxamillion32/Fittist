import {Component} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

@Component({
  templateUrl: 'build/pages/team/team-page.html'
})
export class TeamPage {
	results: Observable<any[]>;

  constructor(af: AngularFire) {
	  this.results = af.database.list('/results');
  }
}
