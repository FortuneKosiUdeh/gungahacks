
import express from 'express';
import handler from './api/submit-form.js';

const app = express();
const port = 3001;

// Vercel's body parser is included in the handler, but for Express, we need to add it.
app.use(express.json());

// This simple wrapper adapts the Vercel handler signature (req, res)
// to be directly usable by Express.
const vercelHandler = (fn) => (req, res) => {
  fn(req, res);
};

app.post('/api/submit-form', vercelHandler(handler));

app.listen(port, () => {
  console.log(`[api-server] Listening on http://localhost:${port}`);
});
