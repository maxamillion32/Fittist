import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {Movement} from '../model/movement';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class MovementService {
    public movements = firebase.database().ref('movements');

    constructor(public events:Events,
                public af: AngularFire) {
    }

    bootstrap() {
        /* Create Movements */
        let bootstrapMovements = [{ name: 'Air Squat', type: 'Monostructural',
                         videoUrl: 'https://www.youtube.com/embed/C_VtOYc6j5c',
                         verified: true },
            {
                name: 'Overhead Squat', type: 'Weightlifting',
                videoUrl: 'https://www.youtube.com/embed/RD_vUnqwqqI',
                verified: true
            },
            {
                name: 'Shoulder Press', type: 'Weightlifting',
                videoUrl: 'https://www.youtube.com/embed/xe19t2_6yis',
                verified: true
            },
            {
                name: 'Push Press', type: 'Weightlifting',
                videoUrl: 'https://www.youtube.com/embed/X6-DMh-t4nQ',
                verified: true
            },
            {
                name: 'Sumo Deadlift High Pull', type: 'Weightlifting',
                videoUrl: 'https://www.youtube.com/embed/o6QniJ9FaGA',
                verified: true
            },
            {
                name: 'Thruster', type: 'Weightlifting',
                videoUrl: 'https://www.youtube.com/embed/aea5BGj9a8Y',
                verified: true
            }];

        for (var i = 0; i < bootstrapMovements.length; i++) {
            this.movements.push(bootstrapMovements[i]);
        }
    }

    getAll(): FirebaseListObservable<Movement[]> {

        /* Streams Workouts one at a time */
        return this.af.database.list('/movements', {
            query: {
                orderByChild: 'name'
            }
        })
    }

    getMovement(id: string): FirebaseObjectObservable<any> {
        /* Validate */
        // return this.movements.child(id).once('value');
        return this.af.database.object('/movements/' + id, {preserveSnapshot: true});
    }

}