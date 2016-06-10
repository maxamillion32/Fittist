"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var AthleteService = (function () {
    function AthleteService(events) {
        this.events = events;
        this.athletes = firebase.database().ref('athletes');
        this.workouts = firebase.database().ref('workouts');
    }
    AthleteService.prototype.bootstrap = function () {
        var _this = this;
        /* Create Some Fake Athletes */
        var andrew = {
            name: 'Andrew Cole',
            team: 'Sundown Crossfit',
            email: 'andrew.thielcole@gmail.com',
            weight: 165,
            units: 'imperial',
            results: /* list of results from workouts? */ [],
        };
        var mike = {
            name: 'Micheal Johnson',
            team: 'Sundown Crossfit',
            email: 'micheal.johnson@gmail.com',
            weight: 195,
            units: 'imperial',
            results: []
        };
        var todd = {
            name: 'Todd Wise',
            team: 'Sundown Crossfit',
            email: 'todd.wise@gmail.com',
            weight: 205,
            units: 'imperial',
            results: []
        };
        /* Get Workouts to use */
        this.workouts.orderByChild('name').once('value').then(function (snapshot) {
            console.log('workouts');
            var workoutList = snapshot.val();
            for (var id in workoutList) {
                var workout = workoutList[id];
                var time = 115;
                workout.resultDate = Date.now();
                workout.result = time + 5;
                todd.result.push(workout);
                workout.result = time - 5;
                andrew.workouts.push(workout);
                workout.result = time;
                mike.workouts.push(workout);
            }
            _this.athletes.push(andrew);
            _this.athletes.push(mike);
            _this.athletes.push(todd);
        });
        console.log(andrew, mike, todd);
    };
    AthleteService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ionic_angular_1.Events])
    ], AthleteService);
    return AthleteService;
}());
exports.AthleteService = AthleteService;
