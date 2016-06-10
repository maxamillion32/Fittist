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
var ionic_angular_1 = require('ionic-angular');
var AuthService_1 = require('../../services/AuthService');
var workout_comp_1 = require('../../components/workout/workout.comp');
var WorkoutService_1 = require('../../services/WorkoutService');
require('rxjs');
var HomePage = (function () {
    function HomePage(auth, work, nav, events) {
        this.auth = auth;
        this.work = work;
        this.nav = nav;
        this.events = events;
        /* Get list of workouts from the workout service */
        this.workoutPipe = this.work.getAll();
    }
    HomePage.prototype.logout = function () {
        this.auth.logout();
        this.events.publish('user:logout');
    };
    Object.defineProperty(HomePage.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify(this.workouts[0]);
        },
        enumerable: true,
        configurable: true
    });
    HomePage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/home/home.html',
            providers: [AuthService_1.AuthService, WorkoutService_1.WorkoutService],
            directives: [workout_comp_1.WorkoutComponent]
        }), 
        __metadata('design:paramtypes', [AuthService_1.AuthService, WorkoutService_1.WorkoutService, ionic_angular_1.NavController, ionic_angular_1.Events])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
