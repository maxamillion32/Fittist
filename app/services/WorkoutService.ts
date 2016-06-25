import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Events} from 'ionic-angular';
import {Workout} from '../model/workout';

@Injectable()
export class WorkoutService {
    public workoutsRef = firebase.database().ref('workouts');

    constructor(public events:Events) {
    }

    bootstrap() {
        /* Create Movements */
    }

    getAll(): Observable<Workout[]> {

        /* Streams Workouts one at a time */
        return Observable.create((observer) => {
            let workouts: Workout[] = [];
            let listener = this.workoutsRef.orderByKey().on('child_added', snapshot => {
                let data = snapshot.val();
                let workout = new Workout({
                    name: data.name,
                    category: data.category,
                    exercises: data.exercises,
                    resultType: data.resultType,
                    id: snapshot.key
                });
                workouts.push(workout);
                observer.next(workouts);
            }, observer.error);

            return () => {
                this.workoutsRef.off('child_added', listener);
            }

        });

    }

    getWorkout(id: string) {
      return this.workoutsRef.child(id).once('value');
    }

    addWorkout(workout: Workout) {
      console.log('Adding Workout: ', workout);
        /* TODO:Check for duplicate workout based on the exercises. All the properties have to be the same */
      return this.workoutsRef.push(workout).key;
    }
}