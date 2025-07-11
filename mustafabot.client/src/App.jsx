import { useState } from 'react';
import './App.css';

function App() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const handleSend = async () => {

        if (!message.trim()) return; // Prevent sending empty messages

        setMessages(prev => [...prev, { text: message, sender: 'user' }]);

        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();

        if (response.ok) {
            setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
            setMessage(''); // Clear input after sending
        } else {
            console.error('Error:', data);
            setMessages(prev => [...prev, { text: 'Error: ' + data.error, sender: 'bot' }]);
        }

        setMessage(''); // Clear input after sending
    };

    return (
        <div className="App">
            <h1>MustafaBot</h1>

            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            <div className="input-area">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask MustafaBot anything..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default App;