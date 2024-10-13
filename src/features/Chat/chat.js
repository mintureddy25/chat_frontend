import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const ChatScreen = ({ sessionId }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const activeUser = { id :localStorage.getItem('userId') };
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null); 
  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    
    socketRef.current = io(url, {
      transports: ['polling']
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to server');
      
      socketRef.current.emit('joinSession', { sessionId, userId: activeUser.id });
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    
    socketRef.current.on('message', (data) => {
      console.log('Received message:', data);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, data];
        localStorage.setItem(`messages-${sessionId}`, JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    });

    
    const storedMessages = JSON.parse(localStorage.getItem(`messages-${sessionId}`)) || [];
    setMessages(storedMessages);

    
    return () => {
      socketRef.current.disconnect();
    };
  }, [sessionId]);

  useEffect(() => {
    
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: Date.now(),
        content: messageInput,
        timestamp: new Date().toISOString(),
        senderId: activeUser.id,
      };

      // Emit message to the server with the recipient ID set to the active user ID
      socketRef.current.emit("message", {
        sessionId,
        content: messageInput,
        recipientId: activeUser.id, 
      });

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        localStorage.setItem(`messages-${sessionId}`, JSON.stringify(updatedMessages));
        return updatedMessages;
      });

      setMessageInput("");
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-gray-200 rounded-lg overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((item) => (
          <div
            key={item.id}
            className={`my-2 p-3 rounded-lg max-w-[75%] transition-all duration-200 ${
              !item.server
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-white text-black self-start"
            }`}
          >
            <p className="text-base">{item.content}</p>
            <span className="text-xs text-gray-600">
              {new Date(item.timestamp).toLocaleString()}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center bg-white p-3 border-t border-gray-300">
        <input
          className="flex-1 p-3 border rounded-lg"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-500 text-white rounded-lg p-3 ml-2"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
