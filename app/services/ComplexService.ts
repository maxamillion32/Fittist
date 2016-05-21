import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';

@Injectable()
export class ComplexService {
    public ref = new Firebase('https://popping-inferno-7577.firebaseio.com/');
    public complex = new Firebase('https://popping-inferno-7577.firebaseio.com/complex');

    constructor(public events:Events) {
    }

    bootstrap() {
        /* Create Simple Complexes */
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

        let complexes = [{movements: [movements[0]], properties:['weight' , 'reps']},];

        for (var i = 0; i < movements.length; i++) {
            // this.movements.push(movements[i]);
            this.complex.push({movements: [movements[i]], properties: movements[i].properties});
        }

    }

}