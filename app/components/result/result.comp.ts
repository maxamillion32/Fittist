import {Component, Input, OnInit} from '@angular/core';
import {Page, NavController, Modal, Events} from 'ionic-angular';
import {Result} from '../../model/result';
import {Athlete} from '../../model/athlete';
import {Workout} from '../../model/workout';
import {AthleteService} from '../../services/AthleteService';
import {WorkoutService} from '../../services/WorkoutService';
import {ComplexService} from '../../services/ComplexService';
import {MovementService} from '../../services/MovementService';
import {ExerciseComponent} from '../exercise/exercise.comp';
import {WorkoutForm} from '../../pages/workout/workoutForm';

@Component({
	selector: 'result',
	templateUrl: 'build/components/result/result.comp.html',
	directives: [ExerciseComponent],
	providers: [WorkoutService, AthleteService, ComplexService, MovementService]
})
export class ResultComponent implements OnInit{
	@Input()
	result: any;
	athlete: Athlete;
	workout: any;

	constructor(public workouts: WorkoutService,
				public athletes: AthleteService,
				private complexes: ComplexService,
				private movements: MovementService,
				private nav: NavController) {
	}

	ngOnInit() {
		this.workouts.getWorkout(this.result.workoutId).then(snapshot => {
			console.log('Getting Workout: ' , snapshot.val());
			this.workout = snapshot.val();
			this.workout.id = snapshot.key;
		});

		this.athletes.getAthlete(this.result.athleteId).then(snapshot => {
			this.athlete = snapshot.val();
		});
	}

	get diagnostic() {
		return JSON.stringify(this.result);
	}

	get workoutDiag() {
		return JSON.stringify(this.workout);
	}

	get athleteDiag() {
		return JSON.stringify(this.athlete);
	}

	addResult(_event, workout) {
		console.log('Add a result to ', workout);
		this.nav.push(WorkoutForm, { workout: this.workout });
	}


}