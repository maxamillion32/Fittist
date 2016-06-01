export class Workout {
    constructor(
		public id: string,
    	public category: string,
    	public exercises: any,
    	public resultType: any,
    	public result?: any,
        public name: string,
    ) {}
}