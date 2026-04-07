export async function getRecentlyPlayed() {
  const res = await fetch('/api/spotify/recently-played')
  if (!res.ok) throw new Error('Failed to fetch recently played tracks')
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  const seen = new Set()
  return data.items
    .filter((item) => {
      if (seen.has(item.track.id)) return false
      seen.add(item.track.id)
      return true
    })
    .map((item) => ({
      id: item.track.id,
      name: item.track.name,
      artist: item.track.artists.map((a) => a.name).join(', '),
      album: item.track.album.name,
      albumArt: item.track.album.images[2]?.url ?? item.track.album.images[0]?.url,
      url: item.track.external_urls.spotify,
      playedAt: new Date(item.played_at),
    }))
}
