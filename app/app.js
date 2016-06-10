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
var ionic_native_1 = require('ionic-native');
var tabs_1 = require('./pages/tabs/tabs');
var core_1 = require('@angular/core');
var login_1 = require("./pages/auth/login");
core_1.enableProdMode();
var config = {
    apiKey: "AIzaSyBwxrtC3SDwiW2sYidYT60eqd2vZWL3BbY",
    authDomain: "popping-inferno-7577.firebaseapp.com",
    databaseURL: "https://popping-inferno-7577.firebaseio.com",
    storageBucket: "popping-inferno-7577.appspot.com",
};
firebase.initializeApp(config);
var MyApp = (function () {
    function MyApp(platform, events) {
        /* listen for login / logout event, change root page */
        this.events = events;
        this.rootPage = tabs_1.TabsPage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            ionic_native_1.StatusBar.styleDefault();
        });
        this.listenToLoginEvents();
    }
    MyApp.prototype.listenToLoginEvents = function () {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.rootPage = tabs_1.TabsPage;
            }
            else {
                _this.rootPage = login_1.LoginPage;
            }
        });
    };
    MyApp = __decorate([
        ionic_angular_1.App({
            template: '<ion-nav [root]="rootPage"></ion-nav>',
            config: {} // http://ionicframework.com/docs/v2/api/config/Config/
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.Platform, ionic_angular_1.Events])
    ], MyApp);
    return MyApp;
}());
exports.MyApp = MyApp;
