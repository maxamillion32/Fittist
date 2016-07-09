import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Events} from 'ionic-angular';
import {Workout} from '../model/workout';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class WorkoutService {
    public workoutsRef = firebase.database().ref('workouts');

    constructor(public events:Events,
                public af: AngularFire) {
    }

    bootstrap() {
        /* Create Movements */
    }

    getAll(): FirebaseListObservable<Workout[]> {
        return this.af.database.list('/workouts', {
            query: {
                orderByKey: true,
                limitToLast: 20
            }
        });
    }

    getWorkout(id: string): FirebaseObjectObservable<any> {
        return this.af.database.object('/workouts/' + id, {preserveSnapshot: true});
    }

    addWorkout(workout: Workout): string {
      console.log('Adding Workout: ', workout);
      return this.af.database.list('/workouts').push(workout).key;
    }
}