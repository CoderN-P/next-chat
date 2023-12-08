import generateSnowflake from '@/app/db/utils/snowflake';
import Message from './Message';
class Chat {
    _id: string;
    name: string;
    users: string[];
    messages: Message[];
    createdAt: Date;
    constructor(name: string, users: string[], messages = [], createdAt: Date = new Date()) {
        this._id = generateSnowflake();
        this.name = name;
        this.users = users;
        this.createdAt = createdAt;
        this.messages = messages;
    }
    convertToJSON() {
        return {
            _id: this._id,
            name: this.name,
            users: this.users,
            createdAt: this.createdAt,
            messages: [...this.messages.map(message => message.convertToJSON())]
        }
    }

    static convertFromJSON(json: any) {
        return new Chat(json.name, json.users, json.createdAt);
    }
}

export default Chat;