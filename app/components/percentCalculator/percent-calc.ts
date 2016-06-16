import {Component, Input} from '@angular/core';
import {Workout} from '../../model/workout';

@Component({
	selector: 'workout',
	templateUrl: 'build/components/workout/workout.comp.html'
})
export class PercentCalcComponent {
	@Input()
	workout: any;

	constructor() {}

	get diagnostic() {
		return JSON.stringify(this.workout);
	}
}