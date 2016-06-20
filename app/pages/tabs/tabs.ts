import {Page, NavController, Modal} from 'ionic-angular';
import {WorkoutForm} from "../workout/workoutForm";
import {HomePage} from '../home/home';
import {UserPage} from '../user/user';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root:any = HomePage;
  tab2Root:any = WorkoutForm;
  tab3Root:any = UserPage;

}
