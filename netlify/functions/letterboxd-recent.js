export const handler = async () => {
  try {
    const username = process.env.LETTERBOXD_USERNAME || 'arthurhuang'
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

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    }
  }
}
