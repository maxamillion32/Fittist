import {Page, NavController, Modal} from 'ionic-angular';
import {LoginPage} from '../auth/login';
import {Component, AfterViewInit, Inject} from '@angular/core';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  public ref = new Firebase('https://popping-inferno-7577.firebaseio.com/');
  authInfo: any = this.ref.getAuth();

  constructor(public nav: NavController) {
    // dont do anything heavy here... do it in ngOnInit
  }

  ngAfterViewInit() {
    this.displayLoginModal();
  }

  displayLoginModal() {
    let loginPage = Modal.create(LoginPage);
    this.nav.present(loginPage);
  }

  logout() {
    this.authInfo = null;
    this.ref.unauth();
    /* Go Home */

  }
}
