import {Page, NavController, Modal} from 'ionic-angular';
import {MovementService} from '../../services/MovementService';
import {Movement} from '../../model/movement';
import {Observable} from 'rxjs/Observable';

@Page({
  templateUrl: 'build/pages/movements/movement-details.page.html',
  providers: [MovementService]
})
export class MovementDetailsPage {

  constructor(private movements: MovementService,
  			  private nav: NavController) {}

  ngOnInit() {
	  this.movementList = this.movements.getAll();
  }

  moreInfo(movement: Movement) {
	  let modal = Modal.create(MovementDetailsPage);


  }

}