"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var snowflake_ts_1 = require("../db/utils/snowflake");
var User = /** @class */ (function () {
    function User(_id, name, email, image, createdAt, friends, chats, status, customStatus, lastReadChat, googleId, phoneNumber) {
        if (_id === void 0) { _id = (0, snowflake_ts_1.generateSnowflake)(); }
        if (createdAt === void 0) { createdAt = new Date(); }
        if (friends === void 0) { friends = []; }
        if (chats === void 0) { chats = []; }
        if (status === void 0) { status = ""; }
        if (customStatus === void 0) { customStatus = ""; }
        if (lastReadChat === void 0) { lastReadChat = ""; }
        if (googleId === void 0) { googleId = ""; }
        if (phoneNumber === void 0) { phoneNumber = ""; }
        this._id = _id;
        this.name = name;
        this.email = email;
        this.image = image;
        this.createdAt = createdAt;
        this.friends = friends;
        this.chats = chats;
        this.customStatus = customStatus;
        this.status = status;
        this.lastReadChat = lastReadChat;
        this.googleId = googleId;
        this.phoneNumber = phoneNumber;
    }
    User.prototype.convertToJSON = function () {
        return {
            _id: this._id,
            name: this.name,
            email: this.email,
            image: this.image,
            createdAt: this.createdAt,
            friends: this.friends,
            chats: this.chats,
            customStatus: this.customStatus,
            status: this.status,
            lastReadChat: this.lastReadChat,
            googleId: this.googleId,
            phoneNumber: this.phoneNumber
        };
    };
    User.convertFromJSON = function (json) {
        return new User(json._id ? json._id : (0, snowflake_ts_1.generateSnowflake)(), json.name, json.email, json.image, json.createdAt ? json.createdAt : new Date(), json.friends ? json.friends : [], json.chats ? json.chats : [], json.status ? json.status : "", json.customStatus ? json.customStatus : "", json.lastReadChat ? json.lastReadChat : "", json.googleId, json.phoneNumber ? json.phoneNumber : "");
    };
    return User;
}());
exports.User = User;
