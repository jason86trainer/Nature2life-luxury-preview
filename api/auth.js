import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    // Exchange code for an access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error });
    }

    const accessToken = tokenData.access_token;

    // Redirect back to Netlify CMS with the token in the URL
    res.redirect(`/admin/#access_token=${accessToken}`);
  } catch (error) {
    console.error('OAuth error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
