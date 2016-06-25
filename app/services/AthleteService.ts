import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';
import {Athlete} from '../model/athlete';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AthleteService {

    public id: string;
    public athletes = firebase.database().ref('athletes');
    public workouts = firebase.database().ref('workouts');
    public cachedData: any = {};

    constructor(public events:Events) {
        /* Get Athlete Information, on creation cache athlete info */
    }

    createAthlete(id: string, credentials: any) {
        return this.athletes.child(id).set({
            name: credentials.name,
            team: credentials.team,
            username: credentials.username,
            id: id
        });
    }

    /* Get Athlete Once */
    getAthlete(id: string): Observable<any> {
        console.log('getAthlete: ', id);
        if (this.cachedData.athlete) {
            return Observable.of(this.cachedData.athlete);
        } else {
            return Observable.create( (observer) => {
                this.athletes.child(id).on('value' , snapshot => {
                   let athlete = snapshot.val();
                   athlete.id = snapshot.key;
                   observer.next(athlete);
                }, observer.error)
            }).do( (data) => {
                this.cachedData.athlete = data;
            });
        }
    }

    bootstrap() {

    }

    addRecords(_workout, _id) {
        let _exercises = _workout.exercises;
        console.log('Checking For PR: ', _workout);
        /* Validate athlete records exist, if not create them locally*/
        if (this.cachedData.athlete)  {
            if (!this.cachedData.athlete.records) {
                this.cachedData.athlete.records = [];
            }
            console.log('athlete exits');
            let found = false;
            /* Sort through exercises, see if the properties are different / better */
            for (var i = 0; i < _exercises.length; i++) {
                _exercises[i].properties.completionDate = Date.now();
                /* Check to see if complex exists in pr database */
                for (var j = 0; j < this.cachedData.athlete.records.length; j++) {
                    if (_exercises[i].complex === this.cachedData.athlete.records[j].complex &&
                        _exercises[i].properties.reps === this.cachedData.athlete.records[j].properties.reps) {
                        found = true;
                        console.log('Found Complex');
                        /* Movements match, now check properties */
                        /* TODO: Need an overwriting property, for example,
                         for lifts it would be weight,
                          for running or rowing it would be time */
                        if (_exercises[i].properties.weight > this.cachedData.athlete.records[j].properties.weight) {
                            //
                            this.cachedData.athlete.records[j] = _exercises[i];
                            console.log('Overwrite PR!');
                        }
                    }
                }
                /* No matching complex, add as new pr */
                if (!found) {
                    console.log('New Pr!', _exercises[i]);
                    this.cachedData.athlete.records.push(_exercises[i]);
                }
            }
        }
        /* Send new info to database */
        this.athletes.child(_id).child('records').set(this.cachedData.athlete.records);
    }

}