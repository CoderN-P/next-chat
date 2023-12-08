import generateSnowflake from "@/app/db/utils/snowflake";

class Message {
    id: string;
    content: string;
    sender: string;
    sendDate: Date;

    constructor(content: string, sender: string, sendDate: Date = new Date()) {
        this.id = generateSnowflake();
        this.content = content;
        this.sender = sender;
        this.sendDate = sendDate;
    }

    convertToJSON() {
        return {
            id: this.id,
            content: this.content,
            sender: this.sender,
            sendDate: this.sendDate
        }
    }

    static convertFromJSON(json: any) {
        return new Message(json.content, json.sender, json.sendDate);
    }
}

export default Message;
