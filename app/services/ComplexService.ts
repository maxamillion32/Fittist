import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';
import {Complex} from '../model/complex';
import {Observable} from 'rxjs/Observable';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class ComplexService {
    public complexes = firebase.database().ref('complex');

    constructor(public events:Events,
                public af: AngularFire) {
    }

    bootstrap() {

    }

    getAll(): FirebaseListObservable<Complex[]> {

        return this.af.database.list('/complex', {
            query: {
                orderByKey: true
            }
        });

    }

    addComplex(complex: Complex): string {
        /* Create Unique ID via Hash */
        var name = '';
        for (var i = 0; i < complex.movements.length; i++) {
            name += complex.movements[i];
        }
        var hash = this.hashCode(name);

        /* Look for complex */
        this.af.database.object('/complex/' + hash, { preserveSnapshot: true })
            .subscribe((data) => {
                console.log('Success', data.val())
                if (data.val()) {
                    return hash;
                } else {
                    this.af.database.object('/complex/' + hash).set(complex);
                }
            }, (error) => {
                console.warn('Error ', error);
            });
        return hash;
    }

    hashCode(s): string {
        return s.split("").reduce(function(a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
    }

    getComplex(id: string): FirebaseObjectObservable<any> {
        return this.af.database.object('/complex/' + id, {preserveSnapshot: true});
    }

}