export class Workout {
    public name: string;
    public category: string;
    public exercises: any;
    public resultType: any;
    public id: string;

    constructor(obj?: any) {
        this.name = obj && obj.name || 'New Workout';
        this.category = obj && obj.category || '';
        this.exercises = obj && obj.exercises || [];
        this.resultType = obj && obj.resultType || '';
        this.id = obj && obj.id || '';
    }

    /* Should be done via constructor overload */
    reset() {
		this.name = '';
		this.category = '';
		this.exercises = [];
		this.resultType = '';
		this.id = '';
    }
}