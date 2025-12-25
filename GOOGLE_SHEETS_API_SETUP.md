# Google Sheets API Setup Guide

## Problem
Google Forms rejects direct POST submissions from browsers with 400 errors. The hidden iframe method doesn't work due to strict form validation.

## Solution
Use Google Sheets API directly via a Vercel serverless function. This is more reliable and gives us guaranteed delivery to your spreadsheet.

---

## Setup Steps

### Step 1: Create a Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing one)
3. Enable the **Google Sheets API**:
   - Search for "Google Sheets API"
   - Click Enable
4. Create a Service Account:
   - Go to **Credentials** → **Create Credentials** → **Service Account**
   - Fill in the name (e.g., "gungahacks-api")
   - Click **Create and Continue**
   - Grant it **Editor** role for Sheets
   - Click **Create**
5. Create a JSON key:
   - Click on the service account you just created
   - Go to **Keys** tab
   - **Add Key** → **Create new key** → **JSON**
   - Save the JSON file (you'll need values from it)

### Step 2: Get Your Google Sheet ID

1. Open your Google Form
2. Go to **Responses** tab
3. Click the **Google Sheets icon** to open the linked sheet
4. The Sheet ID is in the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
5. Copy the `SHEET_ID_HERE` part

### Step 3: Share Sheet with Service Account

1. Open your Google Sheet
2. Click **Share** (top right)
3. Copy the `client_email` from your JSON key file
4. Paste it in the share dialog
5. Give it **Editor** access
6. Click Share

### Step 4: Set Environment Variables

Create a `.env.local` file in your project root:

```
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIE...your key...\n-----END PRIVATE KEY-----\n
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEET_ID=your-sheet-id-from-step-2
```

**Where to get these from your JSON key file:**
- `GOOGLE_PROJECT_ID` → `"project_id"`
- `GOOGLE_PRIVATE_KEY` → `"private_key"` (keep the `\n` as is)
- `GOOGLE_CLIENT_EMAIL` → `"client_email"`
- `GOOGLE_SHEET_ID` → From your Google Sheet URL

### Step 5: Install googleapis Package

```bash
npm install googleapis
```

### Step 6: Test Locally

```bash
npm run dev
```

Then:
1. Open your site
2. Fill in the form
3. Submit
4. Check your Google Sheet — data should appear immediately!

### Step 7: Deploy to Vercel

If deploying to Vercel:

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Import your project
4. **Settings** → **Environment Variables**
5. Add all 4 environment variables from Step 4
6. Deploy

---

## Troubleshooting

### "Module not found: googleapis"
```bash
npm install googleapis
```

### "Service account email not found in sheet"
- Make sure you shared the Google Sheet with the service account email
- Give it **Editor** access (not Viewer)

### "Invalid spreadsheet ID"
- Verify the GOOGLE_SHEET_ID is correct (from the sheet URL)
- Make sure the sheet exists and is accessible

### "Form submission returns 500 error"
- Check Vercel logs for detailed error
- Verify all 4 environment variables are set correctly
- Make sure the private key includes literal `\n` characters

### "Data not appearing in sheet"
- Check the `range` in the API call matches your sheet name
- Default is `'Form Responses 1!A:E'` (adjust if your sheet name is different)
- Verify service account has Editor access to the sheet

---

## File Changes

- **`api/submit-form.js`** - New serverless function
- **`src/pages/home.jsx`** - Updated handleSubmit to use `/api/submit-form` endpoint

---

## How It Works

1. User fills form on your site
2. Click "Submit"
3. Frontend POSTs JSON to `/api/submit-form`
4. Backend authenticates with Google Sheets API
5. Data is appended directly to your sheet
6. Response is returned to frontend
7. Success toast shown to user
8. Form is reset

No more 400 errors! Data is guaranteed to land in your spreadsheet. ✅
