import {Component, Input} from '@angular/core';
import {Movement} from '../../model/movement';

@Component({
	selector: 'movement',
	templateUrl: 'build/components/movement/movement.comp.html',
	directives: []
})
export class MovementComponent {
	/* Takes WorkoutId */
	@Input()
	movement: Movement;

	constructor() {}
}