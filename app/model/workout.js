"use strict";
var Workout = (function () {
    function Workout(id, category, exercises, resultType, result, name) {
        this.id = id;
        this.category = category;
        this.exercises = exercises;
        this.resultType = resultType;
        this.result = result;
        this.name = name;
    }
    return Workout;
}());
exports.Workout = Workout;
