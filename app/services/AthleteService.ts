import {Injectable} from '@angular/core';
import {Events, Toast, NavController} from 'ionic-angular';
import {Athlete} from '../model/athlete';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AthleteService {

    public id: string;
    public athletes = firebase.database().ref('athletes');
    public workouts = firebase.database().ref('workouts');
    public cachedData: any = {};

    constructor(public events:Events,
                private nav: NavController) {
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

    getRecords(_id) {
        /* TODO: Change to Observable */
        return Observable.create((observer) => {
            this.athletes.child(_id).child('records').on('value', snapshot => {
                let records = snapshot.val();
                observer.next(records);
            }, observer.error);
        });
    }

    addRecords(_workout, _id) {
        let _exercises = _workout.exercises;
        console.log('Checking For PR: ', _workout);
        /* Validate athlete records exist, if not create them locally*/
        this.athletes.child(_id).child('records').once('value').then( (data) => {
            let records = [];
            if (data.val()) {
                records = data.val();
                let found = false;
                // Sort through exercises, see if the properties are different / better 
                for (var i = 0; i < _exercises.length; i++) {
                    _exercises[i].properties.completionDate = Date.now();
                    // Check to see if complex exists in pr database 
                    for (var j = 0; j < records.length; j++) {
                        if (_exercises[i].complex === records[j].complex &&
                            _exercises[i].properties.reps === records[j].properties.reps) {
                            found = true;
                            console.log('Found Complex', records[j] , _exercises[i]);
                            // TODO: Find specific overwritting property
                            // Force to Numbers
                            if (Math.round(_exercises[i].properties.weight) > Math.round(records[j].properties.weight)) {
                                //
                                records[j] = _exercises[i];
                                this.showToast('New PR!');
                                console.log('Overwrite PR!', records[j]);
                            }
                        }
                    }
                    // No matching complex, add as new pr 
                    if (!found) {
                        console.log('New Pr!', _exercises[i]);
                        this.showToast('New PR!');
                        records.push(_exercises[i]);
                    }
                }
            } 
            this.athletes.child(_id).child('records').set(records);
        });
            
    }
    
    showToast(message: string) {
        let toast = Toast.create({
            message: message,
            duration: 2000
        });
        this.nav.present(toast);
    }

}