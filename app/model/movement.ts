export class Movement {
    constructor(
        public name: string,
        public type: string,
        public properties: any,
        public id: string,
        public verified?: boolean
    ) {}
}