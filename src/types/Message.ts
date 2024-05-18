import {generateSnowflake} from '../db/utils/snowflake.ts';

class Message {
    _id: string;
    content: string;
    sender: string;
    sendDate: Date;

    constructor(content: string, sender: string, sendDate: Date = new Date()) {
        this._id = generateSnowflake();
        this.content = content;
        this.sender = sender;
        this.sendDate = sendDate;
    }

    convertToJSON() {
        return {
            _id: this._id,
            content: this.content,
            sender: this.sender,
            sendDate: this.sendDate
        }
    }

    static convertFromJSON(json: any) {
        return new Message(json.content, json.sender, json.sendDate);
    }
}

export {Message};
