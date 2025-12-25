import { google } from 'googleapis';
import dotenv from 'dotenv';

// Load .env.local for local development
dotenv.config({ path: '.env.local' });

const sheets = google.sheets('v4');

function getMissingEnvVars() {
  const required = ['GOOGLE_PROJECT_ID', 'GOOGLE_PRIVATE_KEY', 'GOOGLE_CLIENT_EMAIL', 'GOOGLE_SHEET_ID'];
  return required.filter((k) => !process.env[k]);
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Quick environment validation to give actionable errors
  const missing = getMissingEnvVars();
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    return res.status(500).json({ error: 'Missing environment variables', missing });
  }

  // Parse private key: handle both "literal\n" in .env.local and real newlines
  const privateKeyStr = process.env.GOOGLE_PRIVATE_KEY;
  const privateKey = privateKeyStr.includes('\\n') 
    ? privateKeyStr.replace(/\\n/g, '\n')
    : privateKeyStr;

  // Build Google auth with explicit credentials (not relying on default credentials)
  const auth = new google.auth.GoogleAuth({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  try {
    const { name, email, grade, experience, idea } = req.body;

    // Validate required fields
    if (!name || !email || !grade) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get the client for API requests
    const authClient = await auth.getClient();

    // Your Google Sheet ID (from the form responses sheet)
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Append the row to your sheet
    await sheets.spreadsheets.values.append(
      {
        spreadsheetId,
        range: 'Form Responses 1!A:E', // Adjust range if needed
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [
              new Date().toLocaleString(), // Timestamp
              name,
              email,
              grade,
              experience || '',
              idea || '',
            ],
          ],
        },
      },
      { auth: authClient }
    );

    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
    });
  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({
      error: 'Failed to submit form',
      details: error.message,
    });
  }
}
