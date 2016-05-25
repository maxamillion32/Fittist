import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';

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

}