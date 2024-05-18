"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
var snowflake_ts_1 = require("../db/utils/snowflake");
var Chat = /** @class */ (function () {
    function Chat(_id, name, users, messages, createdAt, avatar, owner) {
        if (_id === void 0) { _id = (0, snowflake_ts_1.generateSnowflake)(); }
        if (messages === void 0) { messages = []; }
        if (createdAt === void 0) { createdAt = new Date(); }
        if (avatar === void 0) { avatar = ""; }
        this._id = _id;
        this.name = name;
        this.users = users;
        this.createdAt = createdAt;
        this.messages = messages;
        this.avatar = avatar;
        this.owner = owner;
    }
    Chat.prototype.convertToJSON = function () {
        return {
            _id: this._id,
            name: this.name,
            users: this.users,
            createdAt: this.createdAt,
            messages: __spreadArray([], this.messages.map(function (message) { return message.convertToJSON(); }), true),
            avatar: this.avatar,
            owner: this.owner
        };
    };
    Chat.convertFromJSON = function (json) {
        return new Chat(json._id ? json._id : (0, snowflake_ts_1.generateSnowflake)(), json.name, json.users, json.messages ? json.messages : [], json.createdAt ? json.createdAt : new Date(), json.avatar ? json.avatar : "", json.owner);
    };
    return Chat;
}());
exports.Chat = Chat;
