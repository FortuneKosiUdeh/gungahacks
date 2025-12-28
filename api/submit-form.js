export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, grade, experience, idea } = req.body;

    // Validate required fields
    if (!name || !email || !grade) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeuY2t06KBrPeKs6zwaXjMjEk4qIXxjoCOiLm71Kw8UgXBq5A/formResponse';

    const formData = new URLSearchParams();
    formData.append('entry.1286670390', name);
    formData.append('entry.1959045542', email);
    formData.append('entry.990426861', grade);
    formData.append('entry.533525692', experience || '');
    formData.append('entry.344596077', idea || '');

    console.log('Submitting to Google Forms:', formData.toString());

    const response = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const responseText = await response.text();
    console.log('Google Forms response status:', response.status);
    console.log('Google Forms response text:', responseText);

    if (response.status === 200) {
      return res.status(200).json({
        success: true,
        message: 'Form submitted successfully',
      });
    } else {
      console.error('Google Forms submission failed with status:', response.status);
      return res.status(500).json({
        error: 'Failed to submit form to Google',
        details: responseText,
      });
    }
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({
      error: 'Failed to submit form',
      details: error.message,
    });
  }
}
