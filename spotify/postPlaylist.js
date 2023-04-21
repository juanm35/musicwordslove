 // declare the data fetching function
 export async function postPlaylist(input, token, userId, songsBody, setSuccess){
  const playlistBody = {
      "name": input,
      "description": "Playlist de testeo hecha desde app beta",
      "public": false
  }
  
  const data = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, body: JSON. stringify(playlistBody)});
  const json = await data.json()

  songsBody.forEach( (song) => postSongToPlaylist(token, song, json.id, setSuccess).catch(console.error))
  setSuccess(true)
}

export async function postSongToPlaylist(token, songsBody, playlistId){
  await fetch(`
      https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, body: JSON. stringify(songsBody)});
}


export async function searchSong(q, token){
 const data = await fetch(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=1`, {method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}})
 const json = await data.json()
 const song = json.tracks.items[0]

 console.log( {
  name: song.name,
  id: `spotify:track:${song.id}`
 })

 return `spotify:track:${song.id}`
}