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
var MovementService = (function () {
    function MovementService(events) {
        this.events = events;
        this.movements = firebase.database().ref('movements');
    }
    MovementService.prototype.bootstrap = function () {
        /* Create Movements */
        var movements = [{ name: 'Snatch', 'type': 'Weightlifting', 'verified': true, properties: { weight: null, reps: null } },
            { name: 'Power Snatch', 'type': 'Weightlifting', 'verified': true, properties: { weight: null, reps: null } },
            { name: 'Clean', 'type': 'Weightlifting', 'verified': true, properties: { weight: null, reps: null } },
            { name: 'Power Clean', 'type': 'Weightlifting', 'verified': true, properties: { weight: null, reps: null } },
            { name: 'Run', 'type': 'Monostructural', 'verified': true, properties: ['Distance'] },
            { name: 'Row', 'type': 'Monostructural', 'verified': true, properties: ['Distance'] },
            { name: 'Deadlift', 'type': 'Weightlifting', 'verified': true, properties: { weight: null, reps: null } },
            { name: 'Wall Balls', 'type': 'Monostructural', 'verified': true, properties: { weight: null, reps: null } },
            { name: 'Back Squat', 'type': 'Weightlifting', 'verified': true, properties: { weight: null, reps: null } },
            { name: 'Front Squat', 'type': 'Weightlifting', 'verified': true, properties: { weight: null, reps: null } },
            { name: 'Jerk', 'type': 'Weightlifting', 'verified': true, properties: { weight: null, reps: null } },
            { name: 'Handstand Pushup', 'type': 'Gymnastics', 'verified': true, properties: { reps: null } },
            { name: 'Pushup', 'type': 'Gymnastics', 'verified': true, properties: { reps: null } },
            { name: 'Muscle Up', 'type': 'Gymnastics', 'verified': true, properties: { reps: null } }];
        for (var i = 0; i < movements.length; i++) {
            this.movements.push(movements[i]);
        }
    };
    MovementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ionic_angular_1.Events])
    ], MovementService);
    return MovementService;
}());
exports.MovementService = MovementService;
