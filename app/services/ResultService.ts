import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Events} from 'ionic-angular';
import {Result} from '../model/result';

@Injectable()
export class ResultService {
    public resultsRef = firebase.database().ref('results');

    constructor(public events:Events) {
    }

    bootstrap() {
        let andrewid = '-KIKkUVPl0HNXdjFHL3w';
        let toddid = '-KIKkUVXdjbelpwDP7cy';
        let mikeid = '-KIKkUVSOxVdUiMdtUr6';
        let athleteIds = [andrewid, toddid, mikeid];
        let graceid = '-KIGWlpFGtENqeqTWVRV';
        let isabelid = '-KIGWlpISTbXS6a2Iv6s';
        let karenid = '-KIGWlpJZ1GtFEJMl0eE';
        let workoutIds = [graceid, isabelid, karenid];

        for (var i = 0; i < athleteIds.length; i++) {
            for (var j = 0; j < workoutIds.length; j++) {
                this.resultsRef.push({
                    name: 'result' + i,
                    athleteId: athleteIds[i],
                    workoutId: workoutIds[j],
                    result: Math.round(100 + (Math.random() * 20)) 
                });
            }
        }
    }

    getAll(): Observable<Result[]> {

        /* Streams Workouts one at a time */
        return Observable.create((observer) => {
            let results: Result[] = [];
            let listener = this.resultsRef.orderByKey().on('child_added', snapshot => {
                console.log('Recieved Result from service');
                let data = snapshot.val();
                let result = new Result({
                    id: snapshot.key,
                    name: data.name,
                    athleteId: data.athleteId,
                    workoutId: data.workoutId,
                    result: data.result,
                    completionDate: data.completionDate
                });
                
                results.push(result);
                observer.next(results);
            }, observer.error);

            return () => {
                this.resultsRef.on('child_added', listener);
            }

        });

    }

    getLimited(limit): Observable<Result[]> {
        return Observable.create((observer) => {
            let results: Result[] = [];

            let listener = this.resultsRef.orderByKey().limitToLast(limit).on('child_added', snapshot => {
                // Reverse the order, latest results first
                results.unshift(snapshot.val());
                observer.next(results);
            }, observer.error);
        });
    }

    getByAthlete(athleteId): Observable<Result[]> {
        return Observable.create((observer) => {
            let results: Result[] = [];
            let listener = this.resultsRef
                .orderByChild('athleteId')
                .equalTo(athleteId)
                .limitToLast(10)
                .on('child_added', snapshot => {
                    results.unshift(snapshot.val());
                    observer.next(results);
                }, observer.error);
        });
    }

    getWorkouts() {
        return this.resultsRef.on('value')
    }

    addResult(result: Result) {
        console.log('addResult', result);
        /* Because of the date, there are no duplicates */
        return this.resultsRef.push(result);
        /* After adding result, see if there are any pr's for the athlete on the workout, and on the exercises within */
    }

}