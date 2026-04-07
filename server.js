import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env
const REDIRECT_URI = 'http://127.0.0.1:3001/callback'
const SCOPE = 'user-read-recently-played'

// ── One-time OAuth setup (run `node server.js`, visit /login) ──────────────

app.get('/login', (_req, res) => {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPE,
  })
  res.redirect('https://accounts.spotify.com/authorize?' + params)
})

app.get('/callback', async (req, res) => {
  const code = req.query.code
  if (!code) return res.send('Missing authorization code.')

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  })

  const data = await tokenRes.json()

  if (data.error) {
    return res.send(`Error: ${data.error} — ${data.error_description}`)
  }

  res.send(`
    <html><body style="font-family:monospace;padding:2rem;background:#f5f5f5;">
      <h2 style="color:#17446F;">Spotify Refresh Token</h2>
      <p>Copy the value below into your <code>.env</code> file as <code>SPOTIFY_REFRESH_TOKEN</code>:</p>
      <textarea rows="4" style="width:100%;padding:0.5rem;font-size:1rem;" onclick="this.select()">${data.refresh_token}</textarea>
      <p style="color:green;margin-top:1rem;">Done! You can close this tab and stop the server.</p>
    </body></html>
  `)
})

// ── Spotify API proxy ──────────────────────────────────────────────────────

async function getAccessToken() {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  })
  const data = await res.json()
  if (!data.access_token) throw new Error(data.error_description || 'Token request failed')
  return data.access_token
}

app.get('/api/spotify/recently-played', async (req, res) => {
  try {
    const token = await getAccessToken()
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=6', {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    if (!response.ok) {
      console.error('Spotify API error:', JSON.stringify(data, null, 2))
      return res.status(response.status).json({ error: data.error?.message || 'Spotify API error' })
    }
    res.json(data)
  } catch (err) {
    console.error('Spotify error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`API server running on :${PORT}`))
