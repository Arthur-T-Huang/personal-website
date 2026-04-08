import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const app = express()
app.use(cors())
app.use(express.json())

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

// ── Letterboxd RSS ────────────────────────────────────────────────────────────

app.get('/api/letterboxd/recent', async (req, res) => {
  try {
    const username = process.env.LETTERBOXD_USERNAME || 'arthurhuang'
    // Letterboxd doesn't have a rated/5 RSS — use the watchlist or general diary feed
    // and filter by rating client-side; fallback to general activity RSS
    const urls = [
      `https://letterboxd.com/${username}/films/rated/.5-5/rss/`,
      `https://letterboxd.com/${username}/rss/`,
    ]
    let xml = null
    for (const url of urls) {
      const r = await fetch(url)
      if (r.ok) { xml = await r.text(); break }
    }
    if (!xml) throw new Error('Could not fetch Letterboxd RSS')

    // Parse items from RSS
    const items = []
    const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g)
    for (const [, block] of itemMatches) {
      const title       = block.match(/<letterboxd:filmTitle>(.*?)<\/letterboxd:filmTitle>/)?.[1] ?? block.match(/<title[^>]*>(.*?)<\/title>/)?.[1] ?? ''
      const year        = block.match(/<letterboxd:filmYear>(.*?)<\/letterboxd:filmYear>/)?.[1] ?? ''
      const rating      = block.match(/<letterboxd:memberRating>(.*?)<\/letterboxd:memberRating>/)?.[1] ?? null
      const watchedDate = block.match(/<letterboxd:watchedDate>(.*?)<\/letterboxd:watchedDate>/)?.[1] ?? ''
      const link        = block.match(/<link>\s*(.*?)\s*<\/link>/)?.[1] ?? ''
      const poster      = block.match(/<img src="(https:\/\/a\.ltximg\.com[^"]+)"/)?.[1]
                       ?? block.match(/<img src="([^"]+)"/)?.[1]
                       ?? null

      if (title && rating && parseFloat(rating) === 5) {
        items.push({ title, year, rating: 5, watchedDate, link, poster })
      }
      if (items.length >= 6) break
    }

    res.json(items)
  } catch (err) {
    console.error('Letterboxd error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ── Contact form ──────────────────────────────────────────────────────────────

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s/g, ''),
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p style="white-space:pre-wrap">${message}</p>`,
    })

    res.json({ success: true })
  } catch (err) {
    console.error('Contact email error:', err.message)
    res.status(500).json({ error: 'Failed to send message. Please try again.' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`API server running on :${PORT}`))
