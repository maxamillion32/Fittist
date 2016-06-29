import {Component, Input} from '@angular/core';
import {Workout} from '../../model/workout';
import {MovementService} from '../../services/MovementService';
import {Movement} from '../../model/movement';

@Component({
	selector: 'complex-movements',
	templateUrl: 'build/components/complex/complex-movements.comp.html',
	providers: [MovementService]
})
export class ComplexMovementsComponent {
	@Input()
	complex: any;
	movements: Movement[] = [];

	constructor(private moves: MovementService) {

	}

	ngOnInit() {
		console.log('Complex Movements' , this.complex.movements)
			for (var i = 0; i < this.complex.movements.length;i++) {
				if (this.complex.movements[i]) {
					this.moves.getMovement(this.complex.movements[i]).then((data) => {
						console.log('Movement Data', data);
						this.movements.push(data.val());
					});
				}
			}
	}

	get diagnostic() {
		return JSON.stringify(this.complex);
	}
}