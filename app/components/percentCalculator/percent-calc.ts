import {Component, Input} from '@angular/core';
import {Workout} from '../../model/workout';

@Component({
	selector: 'percent-calculator',
	templateUrl: 'build/components/workout/percent-calc.comp.html'
})
export class PercentCalcComponent {
	@Input()
	complex: any;

	constructor() {}

	get diagnostic() {
		return JSON.stringify(this.complex);
	}
}