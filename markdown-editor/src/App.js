import React, { useState } from 'react';
import './App.css';
import MarkdownEditor from './components/MarkdownEditor';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <button className="toggle-btn" onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <h1>Real-time Markdown Editor with Live Preview</h1>
      <MarkdownEditor darkMode={darkMode} />
    </div>
  );
}

export default App;
