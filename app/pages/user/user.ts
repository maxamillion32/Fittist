import {Page, NavController, Modal, Events} from 'ionic-angular';
import {Component, OnInit, Inject} from '@angular/core';
import {AuthService} from '../../services/AuthService';
import {AthleteService} from '../../services/AthleteService';
import {Workout} from '../../model/workout';
import {Athlete} from '../../model/athlete';
import {Observable} from 'rxjs/Observable';

@Page({
  templateUrl: 'build/pages/user/user.html',
  providers: [AuthService, AthleteService]
})
export class UserPage implements OnInit {

  public athlete: any;

  constructor(private auth: AuthService,
              private athletes: AthleteService) {
   
  }

  ngOnInit() {
    /*
    console.log('init');
    this.athletes.getAthlete(this.auth.getAuth().uid).then(snapshot => {
      this.athlete = snapshot.val();
      console.log('seting athlete', snapshot.val());
    });
    */
  }

  logout() {
    this.auth.logout();
  }
  
}