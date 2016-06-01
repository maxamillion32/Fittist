import {Component, Input} from '@angular/core';
import {Workout} from './workout';

@Component({
	selector: 'Workout-List',
	template: '<div>Hello Component<workout></workout></div>',
	directives: [Workout]
})
export class WorkoutList {
	/* Takes Workout */

	constructor() {}
}