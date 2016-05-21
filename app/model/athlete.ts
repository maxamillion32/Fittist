export class athlete {
    constructor(
        public name: string,
		public verified: boolean,
		public email: string,
		public team?: string,
		public workouts: any,
    ) {}
}