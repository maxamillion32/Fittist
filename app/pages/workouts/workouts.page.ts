import {OnInit, Component} from '@angular/core';
import {Workout} from '../../model/workout';
import {WorkoutService} from '../../services/WorkoutService';
import {AuthService} from '../../services/AuthService';
import {AthleteService} from '../../services/AthleteService';
import {Observable} from 'rxjs/Observable';
import {WorkoutComponent} from '../../components/workout/workout.comp';

@Component({
  templateUrl: 'build/pages/workouts/workout-page.html',
  providers: [AuthService, AthleteService, WorkoutService],
  directives: [WorkoutComponent]
})
export class WorkoutsPage implements OnInit {

  public workoutPipe: Observable<Workout[]>;

  constructor(private athlete: AthleteService,
  			private workouts: WorkoutService,
  			private auth: AuthService) {}

  ngOnInit() {
	  this.workoutPipe = this.workouts.getAll();
  }

}
