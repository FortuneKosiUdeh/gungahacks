import fs from 'fs';
import path from 'path';

function loadEnvFile(envPath) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split(/\r?\n/).forEach((line) => {
    if (!line || line.startsWith('#')) return;
    const idx = line.indexOf('=');
    if (idx === -1) return;
    const key = line.slice(0, idx);
    const value = line.slice(idx + 1);
    process.env[key] = value;
  });
}

const envPath = path.resolve(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('.env.local not found in project root');
  process.exit(1);
}
loadEnvFile(envPath);

import handler from '../api/submit-form.js';

async function runTest() {
  const req = {
    method: 'POST',
    body: {
      name: 'Test User',
      email: 'test@example.com',
      grade: '11',
      experience: 'None',
      idea: 'Testing API integration'
    }
  };

  const res = {
    _status: 200,
    _body: null,
    status(code) {
      this._status = code;
      return this;
    },
    json(obj) {
      this._body = obj;
      console.log('Response status:', this._status);
      console.log('Response body:', JSON.stringify(obj, null, 2));
      return this;
    }
  };

  try {
    await handler(req, res);
  } catch (err) {
    console.error('Handler threw:', err);
  }
}

runTest();
