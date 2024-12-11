import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai'; // Make sure this package is installed

const API_KEY = "AIzaSyDfWKOKfr2D8A9VmZe__NlDu4S3WC8fkv8"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);

const ChatContent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null); // Reference to track the end of messages
  let chat;

  const safetySettings = [
  ];
  

  const initializeChat = async () => {
      if (!chat) {
          chat = await genAI
              .getGenerativeModel({ model: "gemini-pro", safetySettings })
              .startChat({
                  history: [],
                  generationConfig: {
                      maxOutputTokens: 4000, // Adjust tokens limit if needed
                  },
              });
      }
      return chat;
  };

  const sendMessage = async (prompt) => {
    if (prompt.trim() === "") return;
  
    setMessages((prev) => [...prev, { sender: "user", text: prompt }]);
    setInput("");
    setLoading(true);
  
    try {
      const model = await initializeChat();
  
      const result = await model.sendMessage(prompt);
      console.log("API Result Object:", result);
  
      if (result && result.response) {
        const text = await result.response.text();
        console.log("Response Text:", text);
        setMessages((prev) => [...prev, { sender: "ai", text }]);
      } else {
        console.warn("No response or unsafe content");
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "The content cannot be displayed due to safety or API issues.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error during sendMessage:", error);
  
      // Extract additional error details if available
      const errorMessage =
        error?.response?.data?.error?.message || error.message || "Unknown error";
      console.error("Detailed Error:", errorMessage);
  
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Error: ${errorMessage}. Please check API settings or try again later.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleInputChange = (e) => setInput(e.target.value);

  const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
          sendMessage(input);
      }
  };
  
  const handleSendClick = () => sendMessage(input);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
      if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
  };

  // Auto-scroll whenever messages are updated
  useEffect(() => {
      scrollToBottom();
  }, [messages]);

  return (
      <div className="chat-container">
          <div id="output-field" className="output-field">
              What can I help with?
          </div>
          <div id="output-container" className="output-container">
              {messages.map((msg, index) => (
                   <div
                   key={index}
                   className={msg.sender === 'user' ? 'user-message' : 'ai-message'}
                   dangerouslySetInnerHTML={msg.isMarkdown ? { __html: msg.text } : { __html: marked(msg.text) }}
               />
              ))}
              
              {/* Show loading dots while waiting for AI response */}
              {loading && (
                  <div className="ai-message loading">
                      <div className="loading-dot"></div>
                      <div className="loading-dot"></div>
                      <div className="loading-dot"></div>
                  </div>
              )}

              {/* Reference for auto-scrolling */}
              <div ref={messagesEndRef} />
          </div>
          <div className="input-group">
              <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="form-control"
                  placeholder="Type your prompt here..."
              />
              <button onClick={handleSendClick} className="btn btn-primary">Send</button>
          </div>
      </div>
  );
};

export default ChatContent;
