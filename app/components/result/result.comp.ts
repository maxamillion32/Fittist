import {Component, Input, OnInit} from '@angular/core';
import {Page, NavController, Modal, Events} from 'ionic-angular';
import {Result} from '../../model/result';
import {Athlete} from '../../model/athlete';
import {Workout} from '../../model/workout';
import {WorkoutComponent} from '../workout/workout.comp';
import {AthleteService} from '../../services/AthleteService';
import {WorkoutService} from '../../services/WorkoutService';
import {ExerciseComponent} from '../exercise/exercise.comp';
import {WorkoutForm} from '../../pages/workout/workoutForm';
import {ResultType} from '../../model/result-type.enum';
import {FirebaseObjectObservable} from 'angularfire2';
import {SafeUrlPipe} from '../../pipes/safe-url.pipe';

@Component({
	selector: 'result',
	templateUrl: 'build/components/result/result.comp.html',
	directives: [ExerciseComponent, WorkoutComponent],
	providers: [WorkoutService, AthleteService],
	pipes: [SafeUrlPipe]
})
export class ResultComponent implements OnInit{
	@Input() result: any = {};
	public athlete: FirebaseObjectObservable<any>;
	public workout: FirebaseObjectObservable<any>;
	public photoURL;

	constructor(public workouts: WorkoutService,
				public athletes: AthleteService,
				private nav: NavController) {
	}

	ngOnInit() {
		/* this.workouts.getWorkout(this.result.workoutId).subscribe(snapshot => {
			this.workout = snapshot.val();
			this.workout.id = snapshot.key;
		}); */
		this.athlete = this.athletes.getAthlete(this.result.athleteId);
		this.athlete.subscribe( data => {
			this.photoURL = data.photoURL;
		})
	}

	addResult(_event, workout) {
		console.log('Add a result to ', workout);
		this.nav.push(WorkoutForm, { workout: this.workout });
	}


}