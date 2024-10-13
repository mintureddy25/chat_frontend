import {
    CheckIcon
} from '@heroicons/react/20/solid';
import { useState } from 'react';
import ChatScreen from '../Chat/chat';

export default function Dashboard() {
    const [selectedChat, setSelectedChat] = useState(null);
    const chats = ['Chat 1', 'Chat 2', 'Chat 3', 'Chat 4'];

    const selectChat = (chat) => {
        setSelectedChat(chat);
    };

    return (
        <div className="bg-gray-800 min-h-screen p-6">
            <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-bold leading-7 text-white sm:truncate sm:text-2xl sm:tracking-tight">
                        Hello USER
                    </h2>
                </div>
                <div className="flex items-center">
                    <span className="mt-1">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-indigo-500 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            <CheckIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-4 w-4" />
                            lOGOUT
                        </button>
                    </span>
                </div>
            </div>

            {/* Added margin below the button */}
            <div className="mt-4">
                <div className="overflow-hidden rounded-lg bg-gray-900 p-4 h-[600px]"> {/* Adjusted height */}
                    <div className="flex h-full"> {/* Ensure it takes full height */}
                        <div className="w-1/3 bg-gray-800 p-4 border-r border-gray-700 hidden md:block">
                            <h2 className="text-lg font-bold mb-4 text-white">Chats</h2>
                            <ul>
                                {chats.map((chat) => (
                                    <li
                                        key={chat}
                                        className="p-2 cursor-pointer hover:bg-gray-700 text-white"
                                        onClick={() => selectChat(chat)}
                                    >
                                        {chat}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={`flex-1 p-4 ${selectedChat ? 'block' : 'hidden md:block'}`}>
                            <ChatScreen />
                        </div>

                        <div className={`md:hidden w-full p-4 ${selectedChat ? 'block' : 'hidden'}`}>
                            <h2 className="text-xl font-bold text-white">{selectedChat || 'Select a chat'}</h2>
                            <div className="mt-4 text-white">
                                {selectedChat ? (
                                    <ChatScreen />
                                ) : (
                                    <p>Please select a chat to see messages.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
