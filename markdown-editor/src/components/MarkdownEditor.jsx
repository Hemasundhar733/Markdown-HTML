// src/components/MarkdownEditor.js
import React, { useState } from 'react';
import axios from 'axios';
// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './MarkdownEditor.css';

const MarkdownEditor = ({darkMode}) => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');

  const handleMarkdownChange = async (e) => {
    const markdownText = e.target.value;
    setMarkdown(markdownText);
    try {
      const response = await axios.post('http://localhost:5000/convert', { markdown: markdownText });
      setHtml(response.data.html);
    } catch (error) {
      console.error('Error converting markdown:', error);
    }
  };

  return (
    <div className={`markdown-editor ${darkMode ? 'dark' : 'light'}`}>
      <div className="editor-pane">
      <h2>HTML editor</h2>
        <textarea value={markdown} onChange={handleMarkdownChange} placeholder="Enter your Markdown here..." />
        {/* <h2>Highlighter</h2> */}
        {/* <SyntaxHighlighter language="markdown" style={docco}>
          {markdown} 
        </SyntaxHighlighter> */}
      </div>
      <div className="preview-pane">
        <h2>Preview</h2>
        <div className="preview" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
};

export default MarkdownEditor;
