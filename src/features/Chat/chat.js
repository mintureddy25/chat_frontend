import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const activeUser = { id: 1 }; 
  const sessionId = "1234"; 
  const messagesEndRef = useRef(null); // Reference for auto-scrolling

  useEffect(() => {
    const socket = io("http://localhost:1337"); 

    socket.emit("joinSession", sessionId);

    // Load messages from local storage
    const storedMessages = JSON.parse(localStorage.getItem(`messages-${sessionId}`)) || [];
    setMessages(storedMessages);

    // Listen for incoming messages
    socket.on("message", (data) => {
      const newMessage = {
        id: messages.length + 1,
        content: data.content,
        timestamp: new Date().toISOString(),
        senderId: 2, 
      };
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        localStorage.setItem(`messages-${sessionId}`, JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [sessionId]);

  useEffect(() => {
    // Scroll to the bottom of the messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (messageInput.trim()) {
      const socket = io("http://localhost:1337");
      socket.emit("message", { sessionId, content: messageInput });

      const newMessage = {
        id: messages.length + 1,
        content: messageInput,
        timestamp: new Date().toISOString(),
        senderId: activeUser.id,
      };

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        localStorage.setItem(`messages-${sessionId}`, JSON.stringify(updatedMessages));
        return updatedMessages;
      });

      setMessageInput(""); 
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-gray-200 rounded-lg overflow-hidden"> {/* Increased height to 80vh */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((item) => (
          <div
            key={item.id.toString()}
            className={`my-2 p-3 rounded-lg max-w-[75%] transition-all duration-200 ${
              item.senderId === activeUser.id
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
        {/* Ref for scrolling to the last message */}
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
