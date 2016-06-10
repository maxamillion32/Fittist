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
var Observable_1 = require('rxjs/Observable');
var ionic_angular_1 = require('ionic-angular');
var result_1 = require('../model/result');
var ResultService = (function () {
    function ResultService(events) {
        this.events = events;
        this.resultsRef = firebase.database().ref('results');
    }
    ResultService.prototype.bootstrap = function () {
        var andrewid = '-KIKkUVPl0HNXdjFHL3w';
        var toddid = '-KIKkUVXdjbelpwDP7cy';
        var mikeid = '-KIKkUVSOxVdUiMdtUr6';
        var graceid = '-KIGWlpFGtENqeqTWVRV';
        var isabelid = '-KIGWlpISTbXS6a2Iv6s';
        var karenid = '';
        /* Create Movements */
        var resultAndrewGrace = {
            id: '',
            name: 'Result1',
            athleteId: '-KIKkUVPl0HNXdjFHL3w'
        };
    };
    ResultService.prototype.getAll = function () {
        var _this = this;
        /* Streams Workouts one at a time */
        return Observable_1.Observable.create(function (observer) {
            var results = [];
            var listener = _this.resultsRef.on('child_added', function (snapshot) {
                var data = snapshot.val();
                var result = new result_1.Result(snapshot.key, data.name, data.athleteId, data.workoutId, data.result);
                results.push(result);
                observer.next(results);
            }, observer.error);
            return function () {
                _this.resultsRef.on('child_added', listener);
            };
        });
    };
    ResultService.prototype.getWorkouts = function () {
        return this.resultsRef.on('value');
    };
    ResultService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ionic_angular_1.Events])
    ], ResultService);
    return ResultService;
}());
exports.ResultService = ResultService;
