import {Component, Input} from '@angular/core';

@Component({
	selector: 'leaders',
	templateUrl: 'build/components/movement/movement.comp.html',
	directives: []
})
export class LeaderboardComponent {
	/* Takes WorkoutId */
	@Input()
	workoutId: string;

	constructor() {}
}