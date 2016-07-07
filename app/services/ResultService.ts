import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Events} from 'ionic-angular';
import {Result} from '../model/result';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class ResultService {
    public resultsRef = firebase.database().ref('results');

    constructor(public events:Events,
                public af: AngularFire) {
    }

    bootstrap() {

    }

    getLimited(limit): FirebaseListObservable<Result[]> {

        return this.af.database.list('/results', {
            query: {
                orderByKey: true,
                limitToLast: limit,
            }
        });
    }

    getByAthlete(athleteId): FirebaseListObservable<Result[]> {

        return this.af.database.list('/results', {
            query: {
                orderByChild: 'athleteId',
                equalTo: athleteId,
                limitToLast: 10,
            }
        });
    }

    addResult(result: Result): string {
        console.log('addResult', result);
        /* Because of the date, there are no duplicates */
        return this.af.database.list('/results').push(result).key;
        // return this.resultsRef.push(result);
        /* After adding result, see if there are any pr's for the athlete on the workout, and on the exercises within */
    }

}