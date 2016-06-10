export class Workout {
    constructor(
		public name: string,
    	public category: string,
    	public exercises: any,
    	public resultType: any,
		public id?: string
    ) {}
}