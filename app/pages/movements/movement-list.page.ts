import {Page, NavController, Modal} from 'ionic-angular';
import {MovementService} from '../../services/MovementService';
import {Movement} from '../../model/movement';
import {Observable} from 'rxjs/Observable';

@Page({
  templateUrl: 'build/pages/movements/movement-list.page.html',
  providers: [MovementService]
})
export class MovementListPage {

  public movementList: Observable<Movement[]>;

  constructor(private movements: MovementService,
  			  private nav: NavController) {

  }

  ngOnInit() {
	  this.movementList = this.movements.getAll();
  }

  moreInfo(movement: Movement) {
	  let modal = Modal.create(MovementDetailsPage);

	  
  }

}