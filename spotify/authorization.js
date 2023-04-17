export const spotifyAuthorizationUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&scope=%0Auser-read-email%20user-read-private%20playlist-modify-public%20playlist-modify-private`

export async function fetchAccessToken(code, setToken){
    var details = {
      'grant_type': 'authorization_code', 'code': code , 'redirect_uri': process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI
    }
  
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
  
   
    const stringCode = `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`  
    const data = await fetch('https://accounts.spotify.com/api/token', {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Basic ${window.btoa(stringCode)}`}, body: formBody});
    const json = await data.json()
    setToken(json.access_token)
  } 

export async function fetchUserId(token, setUserId){
    const data = await fetch('https://api.spotify.com/v1/me', {method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}});
    const json = await data.json()
    setUserId(json.id)
}

export async function fetchClientCredentials(){
    var details = {
      'grant_type': 'client_credentials', 'client_id': process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID , 'client_secret': process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
    }

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    const data = await fetch('https://accounts.spotify.com/api/token', {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: formBody});
    const json = await data.json()
    return json
  }