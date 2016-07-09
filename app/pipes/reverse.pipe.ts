import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ 
	name: 'reverse',
	pure: false
 })
export class ReversePipe {
	transform(value) {
		if (value) {
			return value.reverse();
		}
	}
}