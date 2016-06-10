export class Athlete {
    constructor(
        public name: string,
		public verified: boolean,
		public email: string,
		public team?: string,
		public units?: string,
		public weight?: number,
		public results?: any
    ) {}
}