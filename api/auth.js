// api/auth.js
// Minimal GitHub OAuth endpoint for Netlify/Decap CMS on Vercel

export default async function handler(req, res) {
  // Lazy load to keep the function tiny
  const { default: oauthHandler } = await import('netlify-cms-oauth-provider-node');

  return oauthHandler({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // scopes are the default needed to write to your repo
  })(req, res);
}
