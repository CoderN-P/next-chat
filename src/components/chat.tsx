"use client";
import loadMessages from '@/app/actions/loadMessages';
import { useState } from 'react';
import getChatMembers from "@/app/actions/getChatMembers";
/*
export default function chat(chatID: string){
    const [curIndex, setCurIdx] = useState(0);
    const limit = 50;
    const [messages, setMessages] = useState(loadMessages(chatID, curIndex, limit));
    const [users, setUsers] = useState(getChatMembers(chatID));

    if (messages.messages){
        setCurIdx(messages.newIdx);
        setMessages(messages.messages);
    }

    return ()

}
*/