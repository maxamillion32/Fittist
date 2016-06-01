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
        let movements = [{name: 'Snatch' , 'type':'Weightlifting', 'verified': true, properties: ['Weight', 'Reps']},
            {name:'Power Snatch','type':'Weightlifting', 'verified': true, properties: ['Weight', 'Reps']},
            {name:'Clean', 'type':'Weightlifting', 'verified': true, properties: ['Weight', 'Reps']},
            {name:'Power Clean', 'type':'Weightlifting', 'verified': true, properties: ['Weight', 'Reps']},
            {name:'Run', 'type':'Monostructural', 'verified': true, properties: ['Distance']},
            {name:'Row', 'type':'Monostructural', 'verified': true, properties: ['Distance']},
            {name:'Deadlift', 'type':'Weightlifting', 'verified': true, properties: ['Weight', 'Reps']},
            {name:'Wall Balls', 'type':'Monostructural', 'verified': true, properties: ['Weight', 'Reps']},
            {name:'Back Squat', 'type':'Weightlifting', 'verified': true, properties: ['Weight', 'Reps']},
            {name:'Front Squat', 'type':'Weightlifting', 'verified': true, properties: ['Weight', 'Reps'] },
            {name:'Jerk', 'type':'Weightlifting', 'verified': true, properties: ['Weight', 'Reps']},
            {name:'Handstand Pushup', 'type':'Gymnastics', 'verified': true, properties: 'Reps'},
            {name:'Pushup', 'type':'Gymnastics', 'verified': true, properties: 'Weight'},
            {name:'Muscle Up', 'type':'Gymnastics', 'verified': true, properties: 'Weight'}];

        let grace = {
            name: 'Grace',
            category: 'Benchmark',
            resultType: 'For Time',
            exercises: [{movements:[movements[2]] , properties: {reps: 30, weight: 135, units:'imp'}}]
        };

        this.workoutsRef.push(grace);

        let isabel = {
            name: 'Isabel',
            category: 'Benchmark',
            resultType: 'For Time',
            exercises: [{movements: [movements[0]] , properties: {reps: 30, weight: 135, units:'imp'}}]
        };

        this.workoutsRef.push(isabel);

        let karen = {
            name: 'Karen',
            category: 'Benchmark',
            resultType: 'For Time',
            exercises: [{movements: movements[7] , properties: {reps: 150, weight: 20, units:'imp'}}]
        };

        this.workoutsRef.push(karen);

    }

    getAll(): Observable<Workout[]> {

        /* Streams Workouts one at a time */
        return Observable.create((observer) => {
            let workouts: Workout[] = [];
            let listener = this.workoutsRef.on('child_added', snapshot => {
                let data = snapshot.val();
                let workout = new Workout(
                    snapshot.key,
                    data.category,
                    data.exercises,
                    data.resultType,
                    data.result,
                    data.name
                );
                workouts.push(workout);
                observer.next(workouts);
            }, observer.error);

            return () => {
                this.workoutsRef.on('child_added', listener);
            }

        });

    }

    getWorkouts() {
        return this.workouts.on('value')
    }

}