import {Page, NavController, Modal} from 'ionic-angular';
import {WorkoutForm} from "../workout/workoutForm";
import {HomePage} from '../home/home';
import {UserPage} from '../user/user';
import {WorkoutsPage} from '../workouts/workouts.page';
import {TeamPage} from '../team/team.page';
import {MovementPage} from '../movements/movement.page';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root:any = HomePage;
  tab2Root:any = WorkoutsPage;
  tab3Root:any = TeamPage;
  tab4Root:any = MovementPage;
  tab5Root: any = UserPage;

}
