import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';
import {Complex} from '../model/complex';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ComplexService {
    public complexes = firebase.database().ref('complex');

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

    addComplex(complex: Complex): Observable<string> {
        /* Create Unique ID via Hash */
        var name = '';
        for (var i = 0; i < complex.movements.length; i++) {
            name += complex.movements[i];
        }
        var hash = this.hashCode(name);
        console.log("Hash Value: ", hash , complex);
        
        /* Look for complex */
        return Observable.create((observer) => {
            let listener = this.complexes.child(hash).once('value').then((snapshot) => {
                            if (snapshot.val()) {
                                observer.next(snapshot.key);
                            } else {
                                complex.id = hash;
                                this.complexes.child(hash).set(complex);
                                observer.next(hash);
                            }
                     }, observer.error );
            return () => {
                console.log('Add Complex Completed');
                return;
            }
        });
    }

    hashCode(s) {
        return s.split("").reduce(function(a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
    }

}