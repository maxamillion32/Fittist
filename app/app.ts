import {Platform, ionicBootstrap, NavController, Modal, Events} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {enableProdMode, ViewChild, Component} from '@angular/core';
import {LoginPage} from "./pages/auth/login";
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire } from 'angularfire2';

enableProdMode();
/* let config = {
  apiKey: "AIzaSyBwxrtC3SDwiW2sYidYT60eqd2vZWL3BbY",
  authDomain: "popping-inferno-7577.firebaseapp.com",
  databaseURL: "https://popping-inferno-7577.firebaseio.com",
  storageBucket: "popping-inferno-7577.appspot.com",
};

firebase.initializeApp(config);
*/
@Component({
  template: '<ion-nav hide-nav-bar="true" [root]="rootPage"></ion-nav>'
})
export class MyApp {
  @ViewChild(NavController) nav;
  
  rootPage: any = TabsPage;

  constructor(platform: Platform,
              public events: Events,
              public af: AngularFire) {
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
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
     }); 
   }
}

ionicBootstrap(MyApp, [
      FIREBASE_PROVIDERS,
      defaultFirebase({
      apiKey: "AIzaSyBwxrtC3SDwiW2sYidYT60eqd2vZWL3BbY",
      authDomain: "popping-inferno-7577.firebaseapp.com",
      databaseURL: "https://popping-inferno-7577.firebaseio.com",
      storageBucket: "popping-inferno-7577.appspot.com"
      })
    ], {
    tabbarPlacement: 'bottom'
  });
