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

    }

    getAll(): Observable<Complex[]> {
        /* Streams Workouts one at a time */
        return Observable.create((observer) => {
            let complexList: Complex[] = [];
            let listener = this.complexes.on('child_added', snapshot => {
                let data = snapshot.val();
                let movement = new Complex({
                    name: data.name,
                    properties: data.properties,
                    id: snapshot.key,
                    movements: data.movements
                });
                complexList.push(movement);
                observer.next(complexList);
            }, observer.error);

            return () => {
                this.complexes.off('child_added', listener);
            }
        });
    }

    addComplex(complex: Complex): Observable<string> {
        /* Create Unique ID via Hash */
        var name = '';
        for (var i = 0; i < complex.movements.length; i++) {
            name += complex.movements[i];
        }
        var hash = this.hashCode(name);
        
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

    getComplex(id: string) {
        return this.complexes.child(id).once('value');
    }

}