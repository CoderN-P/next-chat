import Message from '@/types/Message';

class MessagesResponse {
    messages: Message[];
    newIdx: number;

    constructor(messages: Message[], newIdx: number) {
        this.messages = messages;
        this.newIdx = newIdx;
    }
}

export default MessagesResponse;