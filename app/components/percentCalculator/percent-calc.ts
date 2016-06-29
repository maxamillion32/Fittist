import {Component, Input, OnChanges} from '@angular/core';
import {Workout} from '../../model/workout';
import {AthleteService} from '../../services/AthleteService';
import {AuthService} from '../../services/AuthService';
import {Observable} from 'rxjs/Observable';

@Component({
	selector: 'percentage-calculator',
	templateUrl: 'build/components/percentCalculator/percent-calc.comp.html',
	providers: [AthleteService, AuthService]
})
export class PercentCalcComponent implements OnChanges{
	@Input() complex: any;

	public records: any;
	public complexRecords: any = [];
	public max: any = {};
	public percentages: Array<number> = [1,.95,.90,.85];
	public customWeight: number;
	public customReps: number;
	public customPercent: number;

	constructor(private athletes: AthleteService,
				private auth: AuthService) {
	}

	ngOnInit() {
		console.log('complex', this.complex);
		if (this.complex !== undefined) {
			/* Find Personal Records */
			this.athletes.getRecords(this.auth.id).then((data) => {
				this.records = data.val();
				console.log('Records Recieved');
				this.calculatePrs();
			});
		}
	}

	ngOnChanges(input) {
		/* currentValue, previousValue */
		console.log('OnChange Event', input);
		if (input.complex.currentValue !== input.complex.previousValue && !input.complex.isFirstChange()) {
			this.calculatePrs();
		}
		
	}

	calculatePrs() {
		// Reset Values
		this.complexRecords = [];
		this.max = [];
		let multiplier = 1;
		let topReps = 21;
		let weight = 0;
		// Factors based off of Dos Remedios (2007) Men's Health Power Training
		// 1rep, 3rep, 5rep, 10rep, 20rep
		let reps = [1, 3, 5, 10, 20];
		let factor = [1,.92,.85,.7,.6];
		// Find Records Associated with complex
		console.log('Associated Complexes');
		for (var i = 0; i < this.records.length; i++) {
			if (this.records[i].complex === this.complex) {
				this.complexRecords.push(this.records[i]);
				// Set Multiplier
				if (this.records[i].properties.reps < topReps) {
					topReps = this.records[i].properties.reps;
					weight = this.records[i].properties.weight;
				}
			}
		}

		// Switch multiplier on top reps */
		if (topReps === 1) {
			multiplier = 1;
		} else if (topReps === 3) {
			multiplier = .92;
		} else if (topReps === 5) {
			multiplier = .85;
		} else if (topReps === 10) {
			multiplier = .7;
		} else if (topReps === 20) {
			multiplier = .6;
		}
		
		// Fill out 2d array
		console.log('filling array', this.complexRecords);
		for (var i = 0; i < this.complexRecords.length; i++) {
			this.max[this.complexRecords[i].properties.reps] = {};
			this.max[this.complexRecords[i].properties.reps]['actual'] = this.complexRecords[i].properties.weight;
		}

		// Add Calculated Weights
		reps.forEach((val, index) => {
			if (!this.max[val]) {
				this.max[val] = {};
			}
			this.max[val]['calculated'] = weight * (factor[index] / multiplier);
		});

		console.log(this.max);

	}

	get diagnostic() {
		return JSON.stringify(this.max);
	}
}