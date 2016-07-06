import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {Movement} from '../model/movement';

@Injectable()
export class MovementService {
    public movements = firebase.database().ref('movements');

    constructor(public events:Events) {
    }

    bootstrap() {
        /* Create Movements */
        let movements = [{ name: 'Air Squat', type: 'Monostructural',
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

        for (var i = 0; i < movements.length; i++) {
            this.movements.push(movements[i]);
        }
    }

    getAll(): Observable<Movement[]> {

        /* Streams Workouts one at a time */
        return Observable.create((observer) => {
            let movementList: Movement[] = [];
            let listener = this.movements.orderByChild('name').on('child_added', snapshot => {
                let data = snapshot.val();
                let movement = new Movement({
                    name: data.name,
                    type: data.type,
                    videoUrl: data.videoUrl,
                    id: snapshot.key,
                    verified: data.verified
                });
                movementList.push(movement);
                console.log('MovementList', movementList);
                observer.next(movementList);
            }, observer.error);

            return () => {
                this.movements.on('child_added', listener);
            }
        });

    }

    getMovement(id: string) {
        /* Validate */
        return this.movements.child(id).once('value');
    }

}