import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import './ChatWidget.css';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Hi! How can I help you find a service today?' }
    ]);
    const [loading, setLoading] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMsg = message.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setMessage('');
        setLoading(true);

        try {
            // Direct API call or via AuthService
            const response = await api.post('api/dashboard/chat/', { message: userMsg });
            setMessages(prev => [...prev, { role: 'assistant', text: response.data.response }]);
        } catch (error) {
            console.error("Chat error", error);
            setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I'm having trouble connecting right now." }]);
            toast.error("Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-widget-container">
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>ServiGo Assistant</h3>
                        <button onClick={toggleChat} className="close-btn"><X size={20} /></button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.role}`}>
                                <div className="message-bubble">{msg.text}</div>
                            </div>
                        ))}
                        {loading && <div className="message assistant"><div className="message-bubble">Thinking...</div></div>}
                    </div>

                    <form onSubmit={handleSubmit} className="chat-input-form">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            disabled={loading}
                        />
                        <button type="submit" disabled={loading || !message.trim()}><Send size={18} /></button>
                    </form>
                </div>
            )}

            <button onClick={toggleChat} className="chat-toggle-btn">
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
}
