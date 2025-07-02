import { useState, useRef } from 'react';
import axios from 'axios';
import './ChatBox.css';
import chatIcon from '../../assets/images/icons/robo-idle-transparent.gif';
import headerImage from '../../assets/images/Logo.png';
import { FiberManualRecord, PsychologyAlt, Send } from '@mui/icons-material';
import Spline from '@splinetool/react-spline';
import Scene from "../../assets/scene.splinecode";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! Welcome to our skincare webapp. I am your personal AI, How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const iconRef = useRef(null);
  const messagesEndRef = useRef(null);

  const toggleChatbox = () => {
    const checkUser = sessionStorage.getItem("username") || localStorage.getItem("username");
    if (checkUser) {
      setIsAllowed(true);    // allow showing full chat UI
      setIsOpen(prev => !prev);
    } else {
      setIsAllowed(false);   // show login required notice
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 8000);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    scrollToBottom();

    try {
      const response = await axios.post(
        'https://skincareapp.somee.com/SkinCare/AIChat/ask',
        JSON.stringify(input), // string in stringified JSON
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          withCredentials: true,
        }
      );

      const botResponse = response.data?.response || 'Sorry, something went wrong.';
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('Chat API error:', error);
      setMessages(prev => [...prev, { type: 'bot', text: 'Oops! Something went wrong while processing your request. Please try again.' }]);
    } finally {
      setIsTyping(false);
      scrollToBottom();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chatbox">
      {isAllowed ? (
      <div className={`chatbox__support ${isOpen ? 'chatbox--active' : ''}`}>
        <div className="threeDSpin">
            <div className="cube">
                <div className="top">
                    <div className="fa-brands">AI</div>
                </div>
                <div className="box">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
        <div className="chatbox__header">
          <div className="chatbox__image--header">
            <img src={headerImage} alt="Header" />
          </div>
          <div className="chatbox__content--header">
            <h4 className="chatbox__heading--header">Trung tâm hỗ trợ</h4>
            <p className="chatbox__description--header">
              <FiberManualRecord /> Trực tuyến
            </p>
          </div>
        </div>

        <div className="chatbox__messages">
          <div>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`messages__item ${
                  msg.type === 'bot'
                    ? 'messages__item--respondBot'
                    : 'messages__item--operator'
                }`}
              >
                {msg.text}
              </div>
            ))}

            {isTyping && (
              <div className="messages__item messages__item--typing">
                <span className="messages__dot"></span>
                <span className="messages__dot"></span>
                <span className="messages__dot"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="chatbox__footer">
          <input
            type="text"
            placeholder="Nhập tin nhắn của bạn tại đây..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <p className="chatbox__send--footer" onClick={handleSend}>
            <Send />
          </p>
        </div>
      </div>
      ) : (
        <>{isOpen && (<div className="chatbox__support chatbox--active">
          <div className="container login-required">
            <div className="cardSuggest">
              <div className="card-body">
                <div className="chat-thread">
                  <div className="message">
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span><span></span><span></span>
                      </div>
                      <p>Chào mừng bạn quay trở lại!</p>
                    </div>
                  </div>
                  <div className="message">
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span><span></span><span></span>
                      </div>
                      <p>Có vẻ như bạn chưa đăng nhập để đặt câu hỏi. Vui lòng đăng nhập trước.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)}</>
    )}

      <div className="chatbox__button" onClick={toggleChatbox}>
        <button>
          <span ref={iconRef}>
            <Spline scene={Scene} className="AImascot" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;