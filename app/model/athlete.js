"use strict";
var Athlete = (function () {
    function Athlete(name, verified, email, team, units, weight, results) {
        this.name = name;
        this.verified = verified;
        this.email = email;
        this.team = team;
        this.units = units;
        this.weight = weight;
        this.results = results;
    }
    return Athlete;
}());
exports.Athlete = Athlete;
