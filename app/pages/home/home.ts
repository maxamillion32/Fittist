import {Page, NavController, Modal, Events} from 'ionic-angular';
import {LoginPage} from '../auth/login';
import {Component, AfterViewInit, Inject} from '@angular/core';
import {AuthService} from '../../services/AuthService';
import {WorkoutList} from '../../components/workout/workout-list';

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [AuthService],
  directives: [WorkoutList]
})
export class HomePage {

  constructor(private auth: AuthService,
              public nav: NavController,
              public events: Events) {
    // dont do anything heavy here... do it in ngOnInit
  }

  logout() {
    this.auth.logout();
    this.events.publish('user:logout');
  }
}