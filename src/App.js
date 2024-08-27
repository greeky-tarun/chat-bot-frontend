import React, { useState } from "react";
import avatar from "./images/avatar.png";
import bot from "./images/bot.png";
import chat from "./images/chat-icon.png";
import send from "./images/Vector.png";
import "./bot.css";

const botResponses = {
  "hi": "Hello! How can I assist you today?",
  "hello": "Hi there! What can I do for you?",
  "what is your name?": "I'm your friendly chatbot!",
  "how are you?": "I'm just a bot, but I'm doing great! How about you?",
  "where are you from?": "I'm from the digital realm.",
  "default": "I'm not sure how to respond to that. Can you ask something else?"
};

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi, how can I help you?" }
  ]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const userMessage = e.target.elements.message.value.toLowerCase();
    if (userMessage) {
      setMessages([...messages, { sender: "user", text: userMessage }]);

      // Generate bot response based on user message
      const botResponse = botResponses[userMessage] || botResponses["default"];

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse }
      ]);
      e.target.elements.message.value = "";
    }
  };

  return (
    <div className="body-intro">
      <h1>Hi, I am Tarun Kumar and I made this Chatbot page.</h1>
      <p className="para">Hope You Like It!</p>
    <div className="chatbot-wrapper">
      <div className="chatbot-icon" onClick={toggleChatbot}>
        <img src={chat} alt="Chatbot Icon" />
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <img className="chatbot-avatar" src={avatar} alt="Chatbot Avatar" />
            <div className="chatbot-header-info">
              <h2 className="head">ChatBot</h2>
              <div className="online-status">
                <span className="online-dot"></span> Online
              </div>
            </div>
            <button className="exit-button" onClick={toggleChatbot}>Exit</button>
          </div>

          {/* Chat messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === "bot" ? "message-bot-container" : "message-user"}>
                {msg.sender === "bot" && (
                  <div className="message-bot-avatar">
                    <img className="bot-avatar" src={bot} alt="Bot Avatar" />
                  </div>
                )}
                <div className={msg.sender === "bot" ? "message-bot-text" : ""}>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Message input */}
          <form className="chatbot-input" onSubmit={sendMessage}>
            <input
              type="text"
              name="message"
              placeholder="Ask your question..."
              autoComplete="off"
            />
            <button type="submit">
              <img src={send} alt="Send Icon" />
            </button>
          </form>
        </div>
      )}
    </div>
    </div>
  );
}

export default Chatbot;
