import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ 
	name: 'integer',
	pure: false
 })
export class IntegerPipe {
	transform(value) {
		return Math.round(value);
	}
}