import {Component, Input, OnInit} from '@angular/core';
import {Workout} from '../../model/workout';
import {Movement} from '../../model/movement';
import {ComplexService} from '../../services/ComplexService';
import {MovementService} from '../../services/MovementService';

@Component({
	selector: 'exercise',
	templateUrl: 'build/components/exercise/exercise.comp.html',
	providers: [ComplexService, MovementService]
})
export class ExerciseComponent implements OnInit {
	@Input()
	exercise: any;

	public movementList: Array<Movement> = [];
	public complex;

	constructor(private complexes: ComplexService,
				private movements: MovementService) {
	 }

	 ngOnInit() {
		 console.log('Exercise: ', this.exercise);
		 if (this.exercise.complex) {
			 this.complexes.getComplex(this.exercise.complex).then((snapshot) => {
				 this.complex = snapshot.val();
				 console.log('Complex: ', this.complex);
				 for (var i = 0; i < this.complex.movements.length; i++) {
					 console.log('trying to get: ', this.complex.movements[i]);
					 this.movements.getMovement(this.complex.movements[i]).then((snapshot) => {
						 var move = snapshot.val();
						 console.log('Movement: ', move);
						 this.movementList.push(move);
					 });
				 }
			 });
		 }
	 }

	get diagnostic() {
		return JSON.stringify(this.exercise);
	}
}