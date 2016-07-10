import {Injectable} from '@angular/core';
import {Events, Toast, NavController} from 'ionic-angular';
import {Athlete} from '../model/athlete';
import {Observable} from 'rxjs/Observable';
import * as Firebase from 'firebase';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class AthleteService {

    public id: string;
    public athletes = firebase.database().ref('athletes');
    public workouts = firebase.database().ref('workouts');
    public cachedData: any = {};

    constructor(public events:Events,
                private nav: NavController,
                public af: AngularFire) {
        /* Get Athlete Information, on creation cache athlete info */
    }

    createAthlete(id: string, credentials: any) {
        return this.af.database.list('/athletes').update(id, {
            name: credentials.name,
            team: credentials.team,
            email: credentials.email
        });
    }

    update(_id, updates) {
        this.athletes.child(_id).update(updates);
    }

    /* Get Athlete Once */
    getAthlete(id: string): FirebaseObjectObservable<any> {
        return this.af.database.object('/athletes/' + id);
    }

    bootstrap() {

    }

    getRecords(_id): FirebaseListObservable<any> {
        return this.af.database.list('/athletes/' + _id + '/records', {
            query: {
                orderByKey: true
            },
            preserveSnapshot: true
        });
    }

    addRecords(_workout, _id) {
        let _exercises = _workout.exercises;
        console.log('Checking For PR: ', _workout);
        /* Validate athlete records exist, if not create them locally*/
        this.getRecords(_id).subscribe( (snapshots) => {
            let records = [];
            if (snapshots.length < 1) {
                console.log('No Records Set, Initiating Records');
                records = [];
            } else {
                snapshots.forEach((snap) => {
                    records.push(snap.val());
                });
            }

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
                this.af.database.list('/athletes/' + _id).update('records', records);
            // this.athletes.child(_id).child('records').set(records);
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