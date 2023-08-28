import  { useState } from 'react';
import './App.css';

function App() {
  const [inputUrl, setInputUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  
  const handleShortenClick = async () => {
    const apiKey = '';
    const apiUrl = 'https://api-ssl.bitly.com/v4/shorten';
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ long_url: inputUrl }),
      });

      const data = await response.json();
      setShortenedUrl(data.id);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  const handleCopyClick = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl)
        .then(() => {
          alert('Shortened URL copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy:', err);
        });
    }
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <input
        type="text"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder="Enter your URL"
      />
      <button onClick={handleShortenClick}>Shorten</button>
      {shortenedUrl && (
        <div>
          <p>Shortened URL:</p>
          <p>{shortenedUrl}</p>
          <button onClick={handleCopyClick}>Copy</button>
        </div>
      )}
    </div>
  );
}

export default App;
