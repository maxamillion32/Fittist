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
var workout_1 = require('../../model/workout');
var MovementService_1 = require('../../services/MovementService');
var ComplexService_1 = require('../../services/ComplexService');
var WorkoutService_1 = require("../../services/WorkoutService");
var AthleteService_1 = require('../../services/AthleteService');
var WorkoutForm = (function () {
    function WorkoutForm(movements, complex, workouts, athletes) {
        this.movements = movements;
        this.complex = complex;
        this.workouts = workouts;
        this.athletes = athletes;
        this.name = '';
        this.workout = new workout_1.Workout('New Workout', 'Date');
        // movements.bootstrap();
        // complex.bootstrap();
        // workouts.bootstrap();
        // athletes.bootstrap();
    }
    WorkoutForm.prototype.addExercise = function (form, _event) {
        /* Add Exercise to the exercise list */
        _event.preventDefault();
    };
    WorkoutForm.prototype.logWorkout = function (form, _event) {
        _event.preventDefault();
    };
    Object.defineProperty(WorkoutForm.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify(this.workout);
        },
        enumerable: true,
        configurable: true
    });
    WorkoutForm = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/workout/workoutForm.html',
            providers: [MovementService_1.MovementService, ComplexService_1.ComplexService, WorkoutService_1.WorkoutService, AthleteService_1.AthleteService]
        }), 
        __metadata('design:paramtypes', [MovementService_1.MovementService, ComplexService_1.ComplexService, WorkoutService_1.WorkoutService, AthleteService_1.AthleteService])
    ], WorkoutForm);
    return WorkoutForm;
}());
exports.WorkoutForm = WorkoutForm;
