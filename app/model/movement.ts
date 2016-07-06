export class Movement {
	public name: string;
	public type: string;
	public properties: Array<string>;
	public id: string;
	public verified: boolean;
	public videoUrl: string;

	constructor(obj?: any) {
		this.name = obj && obj.name || '';
		this.type = obj && obj.type || '';
		this.properties = obj && obj.properties || [];
		this.id = obj && obj.id || '';
		this.verified = obj && obj.verified || false;
		this.videoUrl = obj && obj.videoUrl || '';
	}

	/*
    constructor(
        public name: string,
        public type: string,
        public properties: Array<string>,
        public id: string,
        public verified?: boolean
    ) {}
	*/

    reset() {
		this.name = 'Movement';
		this.type = '';
		this.properties = {};
		this.id = '';
		this.verified = false;
    }
}