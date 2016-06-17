import {Page, NavController, Modal, Events} from 'ionic-angular';
import {Control} from '@angular/common';
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
import {Observable} from 'rxjs/Observable';
import {ExerciseComponent} from '../../components/exercise/exercise.comp';
import 'rxjs';

@Page({
    templateUrl: 'build/pages/workout/workoutForm.html',
    directives: [ExerciseComponent],
    providers:[MovementService, ComplexService, WorkoutService, AthleteService, ResultService, AuthService]
})
export class WorkoutForm {

    error: any;
    public name = '';
    public reps = 0;
    public weight = 0;
    public workout: Workout = new Workout('New Workout' , 'None', [], 'For Time', '');
    public complex: Complex = new Complex('' , [], ['reps' , 'weight']);
    public movement: Movement = new Movement('Name', 'Type', ['reps' , 'weight'], '' , false);
    public result: any;
    public movementInput = '';
    isSuperSet: boolean = false;
    searchResults: Observable<any>;
    public suggest: boolean = false;

    constructor(private movements: MovementService,
                private complexes: ComplexService,
                private workouts: WorkoutService,
                private athletes: AthleteService,
                private results: ResultService,
                private auth: AuthService) {
        /* Code for autocomplete */
        this.name = new Control();
        this.searchResults = this.name.valueChanges
            .combineLatest(this.movements.getAll())
            .map((value, index) => {
            /* array with [ search name , values ] */
            var names = [];
            if (value[1][0]) {
                for (var i = 0; i < value[1].length; i++) {
                    if (value[1][i]["name"].toUpperCase().indexOf(value[0].toUpperCase()) >= 0) {
                        names.push(value[1][i]);
                    }
                }
            }
            console.log(names);
            return names;
        });
    }

    superSet() {
        // Just need the movement id
        this.complex.movements.push(this.movement.id);
        this.movement = new Movement('Name', 'Type', ['reps' , 'weight'], '', false);
        this.isSuperSet = true;
    }

    addExercise() {
        /* Add Current Movement to complex */
        this.complex.movements.push(this.movement.id);
        /* Add Exercise to the exercise list */
        // Form has name
        let addComplex = new Complex('', 
                this.complex.movements,
                ['reps' , 'weight']);
        /* Add Complex */
        this.complexes.addComplex(addComplex).subscribe((value) => {
            console.log('Complex Id: ' + value);
            this.workout.exercises.push({
                complex: value,
                properties: { reps: this.reps, weight: this.weight }
            });
        });

        /* Reset Movement */
        this.movement.reset();
    }

    logWorkout() {
        console.log("Logging Workout: " , this.workout);

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

        console.log("Logging Result: ", result);
        /* Add Result */
        this.results.addResult(result);
        this.movement.reset();
        this.complex.reset();
    }

    get diagnostic() {
        return JSON.stringify(this.workout);
    }

    selectMovement(movement) {
        if (movement.properties === undefined) {
            movement.properties = {};
        }
        this.movement = movement;
        this.suggest = false;
    }

    showSuggestions() {
        /* Toggle Drop Down */
        console.log('active');
        this.suggest = true;
    }

    hideSuggestions() {
        /* Let select movement happen before removing the list */
        setTimeout(() => {
                     this.suggest = false;
        }, 200);
    }
}
