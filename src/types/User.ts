import generateSnowflake from "@/db/utils/snowflake";

class User {
    _id: string;
    username: string;
    email: string;
    password: string;
    chats: string[]; // List of chat IDs
    friends: string[]; // List of user IDs
    customStatus: string;
    phoneNumber: string; // Phone number
    avatar: string; // URL to avatar
    status: string; // Online, Offline, Away, etc.
    createdAt: Date;

    constructor({username, email, password, chats=[], friends=[], customStatus="", phoneNumber="", avatar="", status="", createdAt=new Date()} : { username: string, email: string, password: string, chats?: string[], friends?: string[], customStatus?: string, phoneNumber?: string, avatar?: string, status?: string, createdAt?: Date}) {
        this._id = generateSnowflake();
        this.username = username;
        this.email = email;
        this.password = password;
        this.chats = chats;
        this.friends = friends;
        this.customStatus = customStatus;
        this.phoneNumber = phoneNumber;
        this.avatar = avatar;
        this.status = status;
        this.createdAt = createdAt;
    }
    convertToJSON() {
        return {
            _id: this._id,
            username: this.username,
            email: this.email,
            password: this.password,
            chats: this.chats,
            friends: this.friends,
            customStatus: this.customStatus,
            phoneNumber: this.phoneNumber,
            avatar: this.avatar,
            status: this.status,
            createdAt: this.createdAt
        }
    }
}

export default User;