import {Page, NavController, Modal, Events} from 'ionic-angular';
import {Workout} from '../../model/workout';
import {MovementService} from '../../services/MovementService';
import {ComplexService} from '../../services/ComplexService';
import {WorkoutService} from "../../services/WorkoutService";

@Page({
    templateUrl: 'build/pages/workout/workoutForm.html',
    providers:[MovementService, ComplexService, WorkoutService]
})
export class WorkoutForm {

    error: any;
    public name = '';
    public workout: Workout = new Workout('New Workout' , 'Date');

    constructor(private movements: MovementService,
                private complex: ComplexService,
                private workouts: WorkoutService) {
        // movements.bootstrap();
        // complex.bootstrap();
        workouts.bootstrap();
    }

    addExercise( form , _event) {
        /* Add Exercise to the exercise list */
        _event.preventDefault();
    }

    logWorkout( form , _event ) {
        _event.preventDefault();
    }

    get diagnostic() {
        return JSON.stringify(this.workout);
    }

}