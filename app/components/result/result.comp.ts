import {Component, Input, OnInit} from '@angular/core';
import {Result} from '../../model/result';
import {Athlete} from '../../model/athlete';
import {Workout} from '../../model/workout';
import {AthleteService} from '../../services/AthleteService';
import {WorkoutService} from '../../services/WorkoutService';

@Component({
	selector: 'result',
	templateUrl: 'build/components/result/result.comp.html',
	providers: [WorkoutService, AthleteService]
})
export class ResultComponent implements OnInit{
	@Input()
	result: any;
	athlete: Athlete;
	workout: Workout;

	constructor(public workouts: WorkoutService,
				public athletes: AthleteService) {
	}

	ngOnInit() {
		this.workouts.getWorkout(this.result.workoutId).then(snapshot => {
			this.workout = snapshot.val();
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


}