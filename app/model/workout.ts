export class Workout {
    constructor(
		public name: string,
    	public category: string,
    	public exercises: any,
    	public resultType: any,
		public id?: string
    ) {}

    /* Should be done via constructor overload */
    reset() {
		this.name = '';
		this.category = '';
		this.exercises = [];
		this.resultType = '';
		this.id = '';
    }
}