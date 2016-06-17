import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {Movement} from '../model/movement';

@Injectable()
export class MovementService {
    public movements = firebase.database().ref('movements');

    constructor(public events:Events) {
    }

    bootstrap() {
        /* Create Movements */
        let movements = [{name: 'Snatch' , 'type':'Weightlifting', 'verified': true, properties: {weight: null, reps:null}},
            {name:'Power Snatch','type':'Weightlifting', 'verified': true, properties: {weight: null, reps:null}},
            {name:'Clean', 'type':'Weightlifting', 'verified': true, properties: {weight: null, reps:null}},
            {name:'Power Clean', 'type':'Weightlifting', 'verified': true, properties: {weight: null, reps:null}},
            {name:'Run', 'type':'Monostructural', 'verified': true, properties: ['Distance']},
            {name:'Row', 'type':'Monostructural', 'verified': true, properties: ['Distance']},
            {name:'Deadlift', 'type':'Weightlifting', 'verified': true, properties: {weight: null, reps:null}},
            {name:'Wall Balls', 'type':'Monostructural', 'verified': true, properties: {weight: null, reps:null}},
            {name:'Back Squat', 'type':'Weightlifting', 'verified': true, properties: {weight: null, reps:null}},
            {name:'Front Squat', 'type':'Weightlifting', 'verified': true, properties: {weight: null, reps:null} },
            {name:'Jerk', 'type':'Weightlifting', 'verified': true, properties: {weight: null, reps:null}},
            {name:'Handstand Pushup', 'type':'Gymnastics', 'verified': true, properties: {reps: null}},
            {name:'Pushup', 'type':'Gymnastics', 'verified': true, properties: {reps: null}},
            {name:'Muscle Up', 'type':'Gymnastics', 'verified': true, properties: {reps: null}}];

        for (var i = 0; i < movements.length; i++) {
            this.movements.push(movements[i]);
        }
    }

    getAll(): Observable<Movement[]> {

        /* Streams Workouts one at a time */
        return Observable.create((observer) => {
            let movementList: Movement[] = [];
            let listener = this.movements.on('child_added', snapshot => {
                let data = snapshot.val();
                let movement = new Movement(
                    data.name,
                    data.type,
                    data.properties,
                    snapshot.key,
                    data.verified
                );
                movementList.push(movement);
                observer.next(movementList);
            }, observer.error);

            return () => {
                this.movements.on('child_added', listener);
            }
        });

    }

    getMovement(id: string) {
        return this.movements.child(id).once('value');
    }

}