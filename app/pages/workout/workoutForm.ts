import {Page, NavController, Modal, Events} from 'ionic-angular';
import {Workout} from '../../model/workout';
import {Complex} from '../../model/complex';
import {Movement} from '../../model/movement';
import {Result} from '../../model/result';
import {MovementService} from '../../services/MovementService';
import {ComplexService} from '../../services/ComplexService';
import {WorkoutService} from "../../services/WorkoutService";
import {AthleteService} from '../../services/AthleteService';
import {ResultService} from '../../services/ResultService';
import {AuthService} from '../../services/AuthService';

@Page({
    templateUrl: 'build/pages/workout/workoutForm.html',
    providers:[MovementService, ComplexService, WorkoutService, AthleteService, ResultService, AuthService]
})
export class WorkoutForm {

    error: any;
    public name = '';
    public workout: Workout = new Workout('New Workout' , 'None', [], 'For Time', '');
    public complex: Complex = new Complex([] , {});
    public movement: Movement = new Movement('Name', 'Type', {});
    public result: any;
    isSuperSet: boolean = false;

    constructor(private movements: MovementService,
                private complex: ComplexService,
                private workouts: WorkoutService,
                private athletes: AthleteService,
                private results: ResultService,
                private auth: AuthService) {}

    superSet() {
        /* Add a new movement */
        let move = new Movement(
            this.movement.name,
            this.movement.type,
            { reps: this.movement.properties.reps, weight: this.movement.properties.weight });
        this.complex.movements.push(move);
        this.movement = new Movement('Name', 'Type', {});
        this.isSuperSet = true;
    }

    addExercise() {
        /* Add Exercise to the exercise list */
        // Form has name
        let move = new Movement(
            this.movement.name,
            this.movement.type,
            { reps: this.movement.properties.reps,
              weight: this.movement.properties.weight },
              false);
        let addComplex = new Complex([move], move.properties);
        this.workout.exercises.push(addComplex);
        console.log(this.complex);
    }

    logWorkout() {
        console.log(this.workout);

        /* Create Workout, Then Log Result */
        let workoutId = this.workouts.addWorkout(this.workout);
        console.log(workoutId);
        let athleteId = this.auth.getAuth().uid;

        console.log(athleteId);
        let result = new Result(
            '',
            this.workout.name,
            athleteId,
            workoutId,
            this.result,
            (new Date())
        );

        /* Add Result */
        this.results.addResult(result);

    }

    get diagnostic() {
        return JSON.stringify(this.workout);
    }

}
