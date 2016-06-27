import {Page, NavController, NavParams} from 'ionic-angular';
import {MovementService} from '../../services/MovementService';
import {Movement} from '../../model/movement';
import {Observable} from 'rxjs/Observable';

@Page({
  templateUrl: 'build/pages/movements/movement-details.page.html',
  providers: [MovementService]
})
export class MovementDetailsPage {

  public movement: Movement = new Movement({});

  constructor(private movements: MovementService,
  			  private nav: NavController,
          private params: NavParams) {
    if (params.get('movement')) {
      this.movement = params.get('movement');
    }
  }



}