import {App, Platform, NavController, Modal, Events} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {enableProdMode, ViewChild} from '@angular/core';
import {LoginPage} from "./pages/auth/login";

enableProdMode();
let config = {
  apiKey: "AIzaSyBwxrtC3SDwiW2sYidYT60eqd2vZWL3BbY",
  authDomain: "popping-inferno-7577.firebaseapp.com",
  databaseURL: "https://popping-inferno-7577.firebaseio.com",
  storageBucket: "popping-inferno-7577.appspot.com",
};

firebase.initializeApp(config);

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {
    tabbarPlacement: 'bottom'
  } // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  @ViewChild(NavController) nav;
  
  rootPage: any = LoginPage;

  constructor(platform: Platform,
              public events: Events) {
    /* listen for login / logout event, change root page */

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    
  }

  ngAfterViewInit() {
    this.listenToLoginEvents();
  }

  listenToLoginEvents() {
    let modal = Modal.create(LoginPage);

    firebase.auth().onAuthStateChanged((user) => {
      console.log('Auth State Changed: ', user);
      if (null !== user) {
        this.rootPage = TabsPage;
      } else if (this.rootPage === TabsPage ) {
        this.rootPage = LoginPage;
      }
    });
  }
}
