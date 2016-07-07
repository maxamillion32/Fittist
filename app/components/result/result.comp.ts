import {Component, Input, OnInit} from '@angular/core';
import {Page, NavController, Modal, Events} from 'ionic-angular';
import {Result} from '../../model/result';
import {Athlete} from '../../model/athlete';
import {Workout} from '../../model/workout';
import {AthleteService} from '../../services/AthleteService';
import {WorkoutService} from '../../services/WorkoutService';
import {ComplexService} from '../../services/ComplexService';
import {MovementService} from '../../services/MovementService';
import {AuthService} from '../../services/AuthService';
import {ExerciseComponent} from '../exercise/exercise.comp';
import {WorkoutForm} from '../../pages/workout/workoutForm';
import {ResultType} from '../../model/result-type.enum';
import {FirebaseObjectObservable} from 'angularfire2';

@Component({
	selector: 'result',
	templateUrl: 'build/components/result/result.comp.html',
	directives: [ExerciseComponent],
	providers: [WorkoutService, AthleteService, AuthService, ComplexService, MovementService]
})
export class ResultComponent implements OnInit{
	@Input()
	result: any = {};
	public athlete: FirebaseObjectObservable<any>;
	workout: any;

	constructor(public workouts: WorkoutService,
				public athletes: AthleteService,
				private complexes: ComplexService,
				private movements: MovementService,
				private nav: NavController,
				private auth: AuthService) {
	}

	ngOnInit() {
		this.workouts.getWorkout(this.result.workoutId).subscribe(snapshot => {
			this.workout = snapshot.val();
			this.workout.id = snapshot.key;
		});
		this.athlete = this.athletes.getAthlete(this.result.athleteId);
		console.log(this.athlete);
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