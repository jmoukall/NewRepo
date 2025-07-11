import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [message, setMessage] = useState('');
    const [reply, setReply] = useState('');

    const handleSend = async () => {
        const response = await fetch('https://localhost:7086/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();
        setReply(data.reply);
    };

    return (
        <div className="App">
            <h1>MustafaBot</h1>
            <input
               type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask MustafaBot anything..."
            />
            <button onClick={handleSend}>Send</button>
            {reply && (
                <div className="reply">
                    <strong>MustafaBot:</strong> {reply}
                </div>
            )}
        </div>
    );
}

export default App;