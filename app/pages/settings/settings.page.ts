import {Component} from '@angular/core';
import {AuthService} from '../../services/AuthService';
import {AthleteService} from '../../services/AthleteService';
import {FirebaseObjectObservable} from 'angularfire2';

@Component({
  templateUrl: 'build/pages/settings/settings.page.html',
  providers: [AthleteService, AuthService]
})
export class SettingsPage {

	public athlete: FirebaseObjectObservable<any>;

    constructor(private athletes: AthleteService,
			    private auth: AuthService) {
		this.athlete = this.athletes.getAthlete(this.auth.id);
		console.log(this.athlete.team);
    }
}