"use strict";
var Result = (function () {
    function Result(id, name, athleteId, workoutId, result) {
        this.id = id;
        this.name = name;
        this.athleteId = athleteId;
        this.workoutId = workoutId;
        this.result = result;
    }
    return Result;
}());
exports.Result = Result;
