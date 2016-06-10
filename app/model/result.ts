export class Result {
	constructor(
		public id: string,
		public name: string,
		public athleteId: string,
		public workoutId: string,
		public result: number,
		public completionDate: any
	) {}
}