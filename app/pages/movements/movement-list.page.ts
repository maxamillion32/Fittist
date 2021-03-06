import { NavParams, NavController, Modal} from 'ionic-angular';
import {Component} from '@angular/core';
import {MovementService} from '../../services/MovementService';
import {Movement} from '../../model/movement';
import {MovementDetailsPage} from './movement-details.page';
import {Observable} from 'rxjs/Observable';

@Component({
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
	  // this.movements.bootstrap();
  }

  moreInfo(movement: Movement) {
	  this.nav.push(MovementDetailsPage, {'movement': movement});
  }

}
