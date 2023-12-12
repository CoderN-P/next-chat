import generateSnowflake from '@/db/utils/snowflake';
import Message from './Message';
class Chat {
    _id: string;
    name: string;
    users: string[];
    messages: Message[];
    createdAt: Date;
    avatar: string;
    constructor(name: string, users: string[], messages = [], createdAt: Date = new Date(), avatar: string = "") {
        this._id = generateSnowflake();
        this.name = name;
        this.users = users;
        this.createdAt = createdAt;
        this.messages = messages;
        this.avatar = avatar;
    }
    convertToJSON() {
        return {
            _id: this._id,
            name: this.name,
            users: this.users,
            createdAt: this.createdAt,
            messages: [...this.messages.map(message => message.convertToJSON())],
            avatar: this.avatar
        }
    }

    static convertFromJSON(json: any) {
        return new Chat(json.name, json.users, json.createdAt);
    }
}

export default Chat;