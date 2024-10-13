import { CheckIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import ChatScreen from '../Chat/chat';
import { useDispatch } from 'react-redux';
import { selectedUser, unsetCredentials } from '../../utils/authSlice';

export default function Dashboard() {
    const [selectedSession, setSelectedSession] = useState(null);
    const [sessions, setSessions] = useState(localStorage.getItem('sessions') ? JSON.parse(localStorage.getItem('sessions')): []);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = selectedUser?.id || localStorage.getItem('userId');
    const name = selectedUser?.username || localStorage.getItem('name');

    if(!userId){
        navigate('/');
    }


    
    useEffect(() => {
        const storedSessions = JSON.parse(localStorage.getItem('sessions')) || [];
        setSessions(storedSessions);

        
        if (storedSessions.length > 0) {
            setSelectedSession(storedSessions[0]);
        }
    }, []);

    
    useEffect(() => {
        localStorage.setItem('sessions', JSON.stringify(sessions));
    }, [sessions]);

    const selectSession = (session) => {
        setSelectedSession(session);
    };

    const addNewSession = () => {
        const newSessionId = sessions.length > 0 ? Math.max(...sessions.map(s => s.id)) + 1 : 1;
        const newSession = { id: newSessionId };
        setSessions([...sessions, newSession]);
        setSelectedSession(newSession); 
    };

    const deleteSession = (sessionId) => {
        setSessions(sessions.filter(session => session.id !== sessionId));
        localStorage.removeItem(`messages-${sessionId}`);

        // Clear selected session if it was deleted
        if (selectedSession && selectedSession.id === sessionId) {
            setSelectedSession(null);
        }
    };

    const handleLogout = () => {
        dispatch(unsetCredentials());
        localStorage.clear(); 
        navigate("/"); 
    };

    return (
        <div className="bg-gray-800 min-h-screen p-6">
            <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-bold leading-7 text-white sm:truncate sm:text-2xl sm:tracking-tight">
                        Hello {name}
                    </h2>
                </div>
                <div className="flex items-center">
                    <span className="mt-1">
                        <button
                            type="button"
                            onClick={handleLogout} 
                            className="inline-flex items-center rounded-md bg-indigo-500 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
                        >
                           
                            Log out
                        </button>
                    </span>
                </div>
            </div>

            <div className="mt-4">
                <div className="overflow-hidden rounded-lg bg-gray-900 p-4 h-[600px]">
                    <div className="flex h-full">
                        <div className="w-1/3 bg-gray-800 p-4 border-r border-gray-700 hidden md:block">
                            <h2 className="text-lg font-bold mb-4 text-white">Sessions</h2>
                            <ul>
                                {sessions.map((session) => (
                                    <li key={session.id} className="flex justify-between p-2 cursor-pointer hover:bg-gray-700 text-white">
                                        <span onClick={() => selectSession(session)}>
                                            Session: {session.id}
                                        </span>
                                        <button
                                            onClick={() => deleteSession(session.id)}
                                            className="ml-2 text-red-500 hover:text-red-400"
                                        >
                                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={addNewSession}
                                className="mt-4 inline-flex items-center rounded-md bg-green-500 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-400"
                            >
                                <PlusIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-4 w-4" />
                                Create New Session
                            </button>
                        </div>

                        <div className={`flex-1 p-4 hidden md:block`}>
                            {selectedSession ? (
                                <ChatScreen sessionId={selectedSession.id} />
                            ) : (
                                <p className="text-gray-500">Select a session to start chatting.</p>
                            )}
                        </div>

                        <div className={`md:hidden w-full p-4`}>
                            {selectedSession ? (
                                <>
                                    <h2 className="text-xl font-bold text-white">Session: {selectedSession.id}</h2>
                                    <ChatScreen sessionId={selectedSession.id} />
                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold text-white">Sessions</h2>
                                    <p className="text-gray-500">Select a session to start chatting.</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
