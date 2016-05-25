export class Athlete {
    constructor(
        public name: string,
		public verified: boolean,
		public email: string,
		public team?: string,
		public units?: string,
		public weigth?: number,
		public workouts: any,
    ) {}
}