import {Page, NavController, Modal, Events, NavParams, Toast} from 'ionic-angular';
import {Control} from '@angular/common';
import {Input, OnInit} from '@angular/core';
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
import {ResultType} from '../../model/result-type.enum';
import 'rxjs';

@Page({
    templateUrl: 'build/pages/workout/workoutForm.html',
    directives: [ExerciseComponent],
    providers:[MovementService, ComplexService, WorkoutService, AthleteService, ResultService, AuthService]
})
export class WorkoutForm implements OnInit {

    public workout: Workout = new Workout({});
    error: any;
    public name = '';
    public reps = 0;
    public weight = 0;
    public complex: Complex = new Complex();
    public movement: Movement = new Movement();
    public result: string = 'Complete';
    public movementInput = '';
    isSuperSet: boolean = false;
    searchResults: Observable<any>;
    public suggest: boolean = false;
    public exerciseError: boolean = false;

    constructor(private nav: NavController,
                private movements: MovementService,
                private complexes: ComplexService,
                private workouts: WorkoutService,
                private athletes: AthleteService,
                private results: ResultService,
                private auth: AuthService,
                private params: NavParams) {
        console.log('Add a workout', this.result);

        /* Code for autocomplete */
        this.name = new Control();
        this.searchResults = this.name.valueChanges
            .combineLatest(this.movements.getAll())
            .map((value, index) => {
            /* array with [ search name , values ] */
            var names = [];
            console.log('value: ' , value)
            if (value[1][0]) {
                for (var i = 0; i < value[1].length; i++) {
                    if (value[1][i]["name"].toUpperCase().indexOf(value[0].toUpperCase()) >= 0) {
                        names.push(value[1][i]);
                    }
                }
            }
            if (names.length === 0) {
                /* Throw error if not on list */
                this.exerciseError = true;
            } else {
                this.exerciseError = false;
            }
            console.log(names);
            return names;
        });

            if (this.params.get('workout')) {
                this.workout = this.params.get('workout');
                console.log('Recieved Workout: ', this.params.get('workout'));
            }
    }

    ngOnInit() {
        /* Check for workout input */
        if (!this.workout) {
            console.log('No workout given');
            this.workout = new Workout({});
        }
    }

    superSet() {
        // Just need the movement id
        this.complex.movements.push(this.movement.id);
        this.movement = new Movement();
        this.isSuperSet = true;
    }

    addExercise() {

        if (!this.movement.id) {
            this.exerciseError = true;
            let toast = Toast.create({
                message: 'Movement Does Not Exist, Please Select from the drop down menu',
                duration: 2000
            });
            this.nav.present(toast);
        } else {
            /* Add Current Movement to complex */
            this.complex.movements.push(this.movement.id);
            /* Add Exercise to the exercise list */
            // Form has name
            let addComplex = new Complex({
                id: '',
                movements: this.complex.movements,
                properties: ['reps', 'weight']
            });

            /* Add Complex */
            this.complexes.addComplex(addComplex).subscribe((value) => {
                console.log('Complex Id: ' + value);
                this.workout.exercises.push({
                    complex: value,
                    properties: { reps: this.reps, weight: this.weight }
                });
            });

            /* Reset Movement */
            this.movement = new Movement({});
            this.complex = new Complex({});
        }
    }

    logWorkout() {
        console.log("Logging Workout: ", this.workout);
        this.workout.resultType = ResultType.Complete;

        /* Create Workout, Then Log Result */
        let workoutId = this.workout.id;
        if (workoutId === '') {
            console.log('Creating New Workout');
            this.workout.category = 'Custom';
            workoutId = this.workouts.addWorkout(this.workout);
        }

        /* Check For Pr's */

        console.log('Workout ID: ', workoutId);
        let athleteId = this.auth.getAuth().uid;

        console.log('Athlete Id: ', athleteId , this.result);
        let tmpResult = new Result({
            id: '',
            name: this.workout.name,
            athleteId: athleteId,
            workoutId: workoutId,
            result: this.result,
            completionDate: Date.now()
        });

        console.log('tmpResult' , tmpResult);

        /* Add Result */
        this.results.addResult(tmpResult);

        this.athletes.addRecords(this.workout, athleteId);

        /* reset variables */
        this.movement = new Movement({});
        this.complex = new Complex({});
        this.workout = new Workout({});

        console.log("Logging Result: ", tmpResult);

        this.nav.pop();
    }

    get diagnostic() {
        return JSON.stringify(this.workout);
    }

    selectMovement(movement) {
        /* Validate Movement is from list */
            console.log('Select Movement' , movement);
            this.movement = new Movement(movement);
            this.suggest = false;
    }

    showSuggestions() {
        /* Toggle Drop Down */
        this.suggest = true;
    }

    hideSuggestions() {
        /* Let select movement happen before removing the list */
        setTimeout(() => {
                     this.suggest = false;
        }, 300);
    }
}
