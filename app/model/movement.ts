export class Movement {
    constructor(
        public name: string,
        public type: string,
        public properties: Array<string>,
        public id: string,
        public verified?: boolean
    ) {}

    reset() {
		this.name = 'Movement';
		this.type = '';
		this.properties = {};
		this.id = '';
		this.verified = false;
    }
}