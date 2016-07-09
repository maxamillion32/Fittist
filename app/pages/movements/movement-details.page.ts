import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {MovementService} from '../../services/MovementService';
import {Movement} from '../../model/movement';
import {Observable} from 'rxjs/Observable';
import {SafeResourceUrl, DomSanitizationService} from '@angular/platform-browser';

@Component({
  templateUrl: 'build/pages/movements/movement-details.page.html',
  providers: [MovementService]
})
export class MovementDetailsPage {

  public url: SafeResourceUrl;
  public movement: Movement = new Movement({});

  constructor(private movements: MovementService,
  			  private nav: NavController,
          private params: NavParams,
          private sanitizer: DomSanitizationService) {
    if (params.get('movement')) {
      this.movement = params.get('movement');
      console.log('Recieved Movement', this.movement);
      this.url = sanitizer.bypassSecurityTrustResourceUrl(this.movement.videoUrl);
    }
  }

}