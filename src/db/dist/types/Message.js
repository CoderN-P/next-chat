"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var snowflake_1 = require("../db/utils/snowflake");
var Message = /** @class */ (function () {
    function Message(content, sender, sendDate) {
        if (sendDate === void 0) { sendDate = new Date(); }
        this._id = (0, snowflake_1.generateSnowflake)();
        this.content = content;
        this.sender = sender;
        this.sendDate = sendDate;
    }
    Message.prototype.convertToJSON = function () {
        return {
            _id: this._id,
            content: this.content,
            sender: this.sender,
            sendDate: this.sendDate
        };
    };
    Message.convertFromJSON = function (json) {
        return new Message(json.content, json.sender, json.sendDate);
    };
    return Message;
}());
exports.Message = Message;
