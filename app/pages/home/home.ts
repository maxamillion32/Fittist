import {Page, NavController, Modal, Events} from 'ionic-angular';
import {LoginPage} from '../auth/login';
import {Component, OnInit, Inject} from '@angular/core';
import {AuthService} from '../../services/AuthService';
import {WorkoutComponent} from '../../components/workout/workout.comp';
import {ResultComponent} from '../../components/result/result.comp';
import {WorkoutService} from '../../services/WorkoutService';
import {ResultService} from '../../services/ResultService';
import {Workout} from '../../model/workout';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs';

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [AuthService, WorkoutService, ResultService],
  directives: [WorkoutComponent, ResultComponent]
})
export class HomePage implements OnInit {

  public workouts: Workout[];
  public workoutPipe: Observable<Workout[]>;
  public resultPipe: Observable<Result[]>;

  constructor(private auth: AuthService,
              private work: WorkoutService,
              public nav: NavController,
              public events: Events,
              public result: ResultService) {
    /* Get list of workouts from the workout service */
    this.workoutPipe = this.work.getAll();
    this.resultPipe = this.result.getAll();
  }

  logout() {
    this.auth.logout();
    this.events.publish('user:logout');
  }

  get diagnostic() {
    return JSON.stringify(this.workouts[0]);
  }
}