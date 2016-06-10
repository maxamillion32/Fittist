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
var AuthService = (function () {
    function AuthService(events) {
        this.events = events;
        this.auth = firebase.auth();
    }
    AuthService.prototype.getAuth = function () {
        return this.auth.currentUser;
    };
    AuthService.prototype.logout = function () {
        return this.auth.signOut();
    };
    AuthService.prototype.login = function (credentials) {
        return this.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    };
    AuthService.prototype.createUser = function (credentials) {
        /* Add user to users database */
        // ref.child('athletes').push({email: credentials.email});
        return this.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ionic_angular_1.Events])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
