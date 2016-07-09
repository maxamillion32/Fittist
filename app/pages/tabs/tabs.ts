import { NavController, Modal} from 'ionic-angular';
import {Component} from '@angular/core';
import {WorkoutForm} from "../workout/workoutForm";
import {HomePage} from '../home/home';
import {UserPage} from '../user/user';
import {WorkoutsPage} from '../workouts/workouts.page';
import {TeamPage} from '../team/team.page';
import {MovementListPage} from '../movements/movement-list.page';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root:any = HomePage;
  tab2Root:any = WorkoutsPage;
  tab3Root:any = TeamPage;
  tab4Root:any = MovementListPage;
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
