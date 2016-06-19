export class Complex {
	public id: string;
	public movements: Array<string>;
	public properties: any;

	constructor(obj?: any) {
		this.id = obj && obj.id || '';
		this.movements = obj && obj.movements || [];
		this.properties = obj && obj.properties || [];
	}

	reset() {
		this.id = '';
		this.movements = [];
		this.properties = [];
	}
}