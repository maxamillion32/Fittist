import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';

@Injectable()
export class AthleteService {

    public athletes = firebase.database().ref('athletes');
    public workouts = firebase.database().ref('workouts');

    constructor(public events:Events) {
    }

    /* Get Athlete Once */
    getAthlete(id: string) {
        return firebase.database().ref('athletes/' + id).once('value');
    }

    /* Watch Athlete */
    observeAthlete(id: string) {
        // Return Observable on athlete
    }

    bootstrap() {
        /* Create Some Fake Athletes */
        let andrew = {
            name: 'Andrew Cole',
            team: 'Sundown Crossfit',
            email: 'andrew.thielcole@gmail.com',
            weight: 165,
            units: 'imperial',
            results: /* list of results from workouts? */ [],
            
        };

        let mike = {
            name: 'Micheal Johnson',
            team: 'Sundown Crossfit',
            email: 'micheal.johnson@gmail.com',
            weight: 195,
            units: 'imperial',
            results: []
        };

        let todd = {
            name: 'Todd Wise',
            team: 'Sundown Crossfit',
            email: 'todd.wise@gmail.com',
            weight: 205,
            units: 'imperial',
            results: []
        }

        /* Get Workouts to use */
        this.workouts.orderByChild('name').once('value').then((snapshot) => {
            console.log('workouts');
            let workoutList = snapshot.val();
            for (let id in workoutList) {
                let workout = workoutList[id];
                let time = 115;
                workout.resultDate = Date.now();
                workout.result = time + 5;
                todd.result.push(workout);
                workout.result = time - 5;
                andrew.workouts.push(workout);
                workout.result = time;
                mike.workouts.push(workout);
            }
            this.athletes.push(andrew);
            this.athletes.push(mike);
            this.athletes.push(todd);
        });

        console.log(andrew, mike, todd);

    }

}