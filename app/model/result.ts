export class Result {

	public id: string;
	public name: string;
	public athleteId: string;
	public workoutId: string;
	public result: number;
	public completionDate: any;

	constructor(obj?) {
		this.id = obj && obj.id || '';
		this.name = obj && obj.name || '';
		this.athleteId = obj && obj.athleteId || '';
		this.workoutId = obj && obj.workoutId || '';
		this.result = obj & obj.result || 0;
		this.completionDate = obj && obj.completionDate || '';
	}
}