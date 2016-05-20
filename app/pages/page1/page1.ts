import {Page, NavController, Modal, Events} from 'ionic-angular';
import {LoginPage} from '../auth/login';
import {Component, AfterViewInit, Inject} from '@angular/core';
import {AuthService} from '../../services/AuthService';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  providers: [AuthService]
})
export class Page1 {

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
