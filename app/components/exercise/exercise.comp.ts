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
		 if (this.exercise.complex) {
			 this.complexes.getComplex(this.exercise.complex).subscribe((snapshot) => {
				 this.complex = snapshot.val();
				 for (var i = 0; i < this.complex.movements.length; i++) {
					 this.movements.getMovement(this.complex.movements[i]).subscribe((snapshot) => {
						 var move = snapshot.val();
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