import {generateSnowflake} from '../utils/snowflake';

class User {
    _id: string;
    name: string;
    email: string;
    image: string;
    createdAt: Date;
    friends: string[];
    chats: string[];
    status: string;
    customStatus: string;
    lastReadChat: string;
    googleId: string;
    phoneNumber: string;

    constructor(_id: string=generateSnowflake(), name: string, email: string, image: string, createdAt: Date = new Date(), friends: string[] = [], chats: string[] = [], status: string = "", customStatus: string = "", lastReadChat: string = "", googleId: string = "", phoneNumber: string = "") {
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

    convertToJSON() {
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
        }
    }

    static convertFromJSON(json: any) {
        return new User(json._id?json._id:generateSnowflake(), json.name, json.email, json.image, json.createdAt?json.createdAt:new Date(), json.friends?json.friends:[], json.chats?json.chats:[], json.status?json.status:"", json.customStatus?json.customStatus:"", json.lastReadChat?json.lastReadChat:"", json.googleId, json.phoneNumber?json.phoneNumber:"");
    }

}

export {User};