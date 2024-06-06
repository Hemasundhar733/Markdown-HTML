// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const MarkdownIt = require('markdown-it');
const highlight = require('highlight.js');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && highlight.getLanguage(lang)) {
      try {
        return highlight.highlight(lang, str).value;
      } catch (__) {}
    }
    return ''; // use external default escaping
  }
});

app.post('/convert', (req, res) => {
  const { markdown } = req.body;
  try {
    const html = md.render(markdown);
    res.json({ html });
  } catch (error) {
    res.status(500).json({ error: 'Error converting markdown to HTML' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
