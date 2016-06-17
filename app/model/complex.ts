export class Complex {
	public id: string;
	public movements: Array<string>;
	public properties: any;

	constructor(
		id: string,
		movements: Array<string>,
		properties: any
	) {	
		this.id = id || '';
		this.movements = movements || [];
		this.properties = properties || {};
	}

	reset() {
		this.id = '';
		this.movements = [];
		this.properties = {};
	}
}