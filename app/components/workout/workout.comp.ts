import {Component, Input} from '@angular/core';
import {Workout} from '../../model/workout';
import {WorkoutService} from '../../services/WorkoutService';
import {FirebaseObjectObservable} from 'angularfire2';

@Component({
	selector: 'workout',
	templateUrl: 'build/components/workout/workout.comp.html',
	providers: [WorkoutService]
})
export class WorkoutComponent implements OnInit {
	@Input()
	workoutId: string;
	public workout: FirebaseObjectObservable<any>;
	public workoutPhotoURL;
	constructor(private workouts: WorkoutService) {}

	get diagnostic() {
		return JSON.stringify(this.workoutId);
	}

	ngOnInit() {
		/* Get Workout Details */
		this.workout = this.workouts.getWorkout(this.workoutId);
		this.workout.subscribe((data) => {
			this.workoutPhotoURL = data.photoURL;
		});
	}

}