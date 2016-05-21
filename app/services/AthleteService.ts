import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';

@Injectable()
export class AthleteService {
    public ref = new Firebase('https://popping-inferno-7577.firebaseio.com/');
    public athletes = new Firebase('https://popping-inferno-7577.firebaseio.com/athletes');

    constructor(public events:Events) {
    }

    bootstrap() {
        /* Create Some Fake Athletes */
        let andrew = {
            name: 'Andrew Cole',
            team: 'Sundown Crossfit',
            email: 'andrew.thielcole@gmail.com',
            weight: 165,
            units: 'imperial',
            workouts: /* list of results from workouts? */ [],
            
        }

    }

}