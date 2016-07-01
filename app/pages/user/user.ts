import {Page, NavController, Modal, Events} from 'ionic-angular';
import {Component, OnInit, Inject} from '@angular/core';
import {AuthService} from '../../services/AuthService';
import {AthleteService} from '../../services/AthleteService';
import {Workout} from '../../model/workout';
import {Athlete} from '../../model/athlete';
import {Observable} from 'rxjs/Observable';
import {PercentCalcComponent} from '../../components/percentCalculator/percent-calc';
import {ComplexMovementsComponent} from '../../components/complex/complex-movements.comp';
import {Complex} from '../../model/complex';
import {ComplexService} from '../../services/ComplexService';

@Page({
  templateUrl: 'build/pages/user/user.html',
  providers: [AuthService, AthleteService, ComplexService],
  directives: [PercentCalcComponent, ComplexMovementsComponent]
})
export class UserPage implements OnInit {

  public athlete: any;
  public log: boolean = true;
  public records: boolean = false;
  public complexes: Observable<Complex[]>;
  /* Set Default Value */
  public selectComplex: string = '1174595709';

  constructor(private auth: AuthService,
              private athletes: AthleteService,
              private complexService: ComplexService) {
    this.complexes = this.complexService.getAll();
  }

  ngOnInit() {
    
    console.log('init');
    this.athletes.getAthlete(this.auth.id).subscribe((data) => {
      this.athlete = data;
    });
    
  }

  logout() {
    this.auth.logout();
  }

  logTab() {
    this.log = true;
    this.records = false;
  }

  recordsTab() {
    this.log = false;
    this.records = true;
  }
  
}