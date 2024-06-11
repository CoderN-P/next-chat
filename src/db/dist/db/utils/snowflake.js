"use strict";
// Generates snowflake ids
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSnowflake = void 0;
function generateSnowflake() {
    var epoch = 1546300800000;
    var time = Date.now() - epoch;
    var random = Math.floor(Math.random() * 1000);
    return ((time * 1000) + random).toString();
}
exports.generateSnowflake = generateSnowflake;
