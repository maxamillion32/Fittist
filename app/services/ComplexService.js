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
var ComplexService = (function () {
    function ComplexService(events) {
        this.events = events;
        this.complex = firebase.database().ref('complex');
    }
    ComplexService.prototype.bootstrap = function () {
        /* Create Simple Complexes */
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
        var complexes = [{ movements: [movements[0]], properties: ['weight', 'reps'] },];
        for (var i = 0; i < movements.length; i++) {
            // this.movements.push(movements[i]);
            this.complex.push({ movements: [movements[i]], properties: movements[i].properties });
        }
    };
    ComplexService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ionic_angular_1.Events])
    ], ComplexService);
    return ComplexService;
}());
exports.ComplexService = ComplexService;
