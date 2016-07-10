import {Component} from '@angular/core';
import {AuthService} from '../../services/AuthService';
import {AthleteService} from '../../services/AthleteService';
import {FirebaseObjectObservable} from 'angularfire2';
import {Athlete} from '../../model/Athlete';

@Component({
  templateUrl: 'build/pages/settings/settings.page.html',
  providers: [AthleteService, AuthService]
})
export class SettingsPage {

	public athlete: FirebaseObjectObservable<Athlete[]>;
	public units: string;

    constructor(private athletes: AthleteService,
			    private auth: AuthService) {
		this.athlete = this.athletes.getAthlete(this.auth.id);
    }

    changeUnits() {
		this.athlete.update({ 'units': this.athlete.units });
    }

    updateName() {
		this.athlete.update({ 'name': this.athlete.name });
    }

	updateTeam() {
		this.athlete.update({ 'team': this.athlete.team });
    }
}