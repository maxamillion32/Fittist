export class Athlete {
    constructor(
        public name: string,
		public email: string,
		public team: string,
		public records: any,
		public units?: string,
		public weight?: number,
    ) {}
}