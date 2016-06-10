"use strict";
var Movement = (function () {
    function Movement(name, type, properties, verified) {
        this.name = name;
        this.type = type;
        this.properties = properties;
        this.verified = verified;
    }
    return Movement;
}());
exports.Movement = Movement;
