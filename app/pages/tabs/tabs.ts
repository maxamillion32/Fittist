import { NavController, Modal} from 'ionic-angular';
import {Component} from '@angular/core';
import {WorkoutForm} from "../workout/workoutForm";
import {HomePage} from '../home/home';
import {UserPage} from '../user/user';
import {MovementListPage} from '../movements/movement-list.page';
import {DiscoverPage} from '../discover/discover.page';
import {ProgramPage} from '../program/program.page';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root:any = HomePage;
  tab2Root:any = DiscoverPage;
  tab3Root:any = ProgramPage;
  tab4Root: any = MovementListPage;
  tab5Root: any = UserPage;

  public showMenu: boolean = false;

  constructor(private nav: NavController) {

  }

  addMenu() {
	  console.log('add menu');
	  this.showMenu = !this.showMenu;
  }

  createWorkout() {
  	  /* Doesnt need to toggle */
	  this.showMenu = false;
	  this.nav.push(WorkoutForm);
  }

}
