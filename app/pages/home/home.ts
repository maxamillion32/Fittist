import {Component, Inject} from '@angular/core';
import {ResultComponent} from '../../components/result/result.comp';
import {ResultService} from '../../services/ResultService';
import {Result} from '../../model/result';
import {Observable} from 'rxjs/Observable';
import {FirebaseListObservable} from 'angularfire2';
import {ReversePipe} from '../../pipes/reverse.pipe';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [ResultService],
  directives: [ResultComponent]
})
export class HomePage {

  public resultPipe: Observable<any>;

  constructor(public result: ResultService) {
    /* Get list of workouts from the workout service */
    this.resultPipe = this.result.getLimited(10).map((arr) => { return arr.reverse(); });
  }

}