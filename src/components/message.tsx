"use client";
import Message from '@/types/Message';
import User from '@/types/User';


export default function message(message: Message, users: User[]){
    const curUser = users.find((user) => {
        return user._id == message.sender;
    });


    return (

    )
}