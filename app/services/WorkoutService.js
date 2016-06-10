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
var workout_1 = require('../model/workout');
var WorkoutService = (function () {
    function WorkoutService(events) {
        this.events = events;
        this.workoutsRef = firebase.database().ref('workouts');
    }
    WorkoutService.prototype.bootstrap = function () {
        /* Create Movements */
        var movements = [{ name: 'Snatch', 'type': 'Weightlifting', 'verified': true, properties: ['Weight', 'Reps'] },
            { name: 'Power Snatch', 'type': 'Weightlifting', 'verified': true, properties: ['Weight', 'Reps'] },
            { name: 'Clean', 'type': 'Weightlifting', 'verified': true, properties: ['Weight', 'Reps'] },
            { name: 'Power Clean', 'type': 'Weightlifting', 'verified': true, properties: ['Weight', 'Reps'] },
            { name: 'Run', 'type': 'Monostructural', 'verified': true, properties: ['Distance'] },
            { name: 'Row', 'type': 'Monostructural', 'verified': true, properties: ['Distance'] },
            { name: 'Deadlift', 'type': 'Weightlifting', 'verified': true, properties: ['Weight', 'Reps'] },
            { name: 'Wall Balls', 'type': 'Monostructural', 'verified': true, properties: ['Weight', 'Reps'] },
            { name: 'Back Squat', 'type': 'Weightlifting', 'verified': true, properties: ['Weight', 'Reps'] },
            { name: 'Front Squat', 'type': 'Weightlifting', 'verified': true, properties: ['Weight', 'Reps'] },
            { name: 'Jerk', 'type': 'Weightlifting', 'verified': true, properties: ['Weight', 'Reps'] },
            { name: 'Handstand Pushup', 'type': 'Gymnastics', 'verified': true, properties: 'Reps' },
            { name: 'Pushup', 'type': 'Gymnastics', 'verified': true, properties: 'Weight' },
            { name: 'Muscle Up', 'type': 'Gymnastics', 'verified': true, properties: 'Weight' }];
        var grace = {
            name: 'Grace',
            category: 'Benchmark',
            resultType: 'For Time',
            exercises: [{ movements: [movements[2]], properties: { reps: 30, weight: 135, units: 'imp' } }]
        };
        this.workoutsRef.push(grace);
        var isabel = {
            name: 'Isabel',
            category: 'Benchmark',
            resultType: 'For Time',
            exercises: [{ movements: [movements[0]], properties: { reps: 30, weight: 135, units: 'imp' } }]
        };
        this.workoutsRef.push(isabel);
        var karen = {
            name: 'Karen',
            category: 'Benchmark',
            resultType: 'For Time',
            exercises: [{ movements: movements[7], properties: { reps: 150, weight: 20, units: 'imp' } }]
        };
        this.workoutsRef.push(karen);
    };
    WorkoutService.prototype.getAll = function () {
        var _this = this;
        /* Streams Workouts one at a time */
        return Observable_1.Observable.create(function (observer) {
            var workouts = [];
            var listener = _this.workoutsRef.on('child_added', function (snapshot) {
                var data = snapshot.val();
                var workout = new workout_1.Workout(snapshot.key, data.category, data.exercises, data.resultType, data.result, data.name);
                workouts.push(workout);
                observer.next(workouts);
            }, observer.error);
            return function () {
                _this.workoutsRef.on('child_added', listener);
            };
        });
    };
    WorkoutService.prototype.getWorkouts = function () {
        return this.workouts.on('value');
    };
    WorkoutService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ionic_angular_1.Events])
    ], WorkoutService);
    return WorkoutService;
}());
exports.WorkoutService = WorkoutService;
