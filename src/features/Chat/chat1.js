// src/ChatApp.js

import React, { useState } from 'react';

const ChatApp = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    const chats = ['Chat 1', 'Chat 2', 'Chat 3', 'Chat 4'];

    const selectChat = (chat) => {
        setSelectedChat(chat);
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/3 bg-gray-100 p-4 border-r border-gray-300 hidden md:block">
                <h2 className="text-xl font-bold mb-4">Chats</h2>
                <ul>
                    {chats.map((chat) => (
                        <li
                            key={chat}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => selectChat(chat)}
                        >
                            {chat}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={`flex-1 p-4 ${selectedChat ? 'block' : 'hidden md:block'}`}>
                <h2 className="text-xl font-bold">{selectedChat || 'Select a chat'}</h2>
                <div className="mt-4">
                    {selectedChat ? (
                        <div>
                            <p>Messages for {selectedChat}</p>
                            <p>This is a sample message.</p>
                        </div>
                    ) : (
                        <p>Please select a chat to see messages.</p>
                    )}
                </div>
            </div>

            <div className={`md:hidden w-full p-4 ${selectedChat ? 'block' : 'hidden'}`}>
                <h2 className="text-xl font-bold">{selectedChat || 'Select a chat'}</h2>
                <div className="mt-4">
                    {selectedChat ? (
                        <div>
                            <p>Messages for {selectedChat}</p>
                            <p>This is a sample message.</p>
                        </div>
                    ) : (
                        <p>Please select a chat to see messages.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatApp;
