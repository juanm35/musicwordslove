import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function logIn() {
    const router = useRouter()


    const [token, setToken] = useState("")
    const [userId, setUserId] = useState("")
    const [input, setInput] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect (() => {
        const {code} = router.query
        if (code){
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
    
        // declare the data fetching function
        const fetchAccessToken = async () => {
          const stringCode = `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`  
          const data = await fetch('https://accounts.spotify.com/api/token', {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Basic ${window.btoa(stringCode)}`}, body: formBody});
          const json = await data.json()
          setToken(json.access_token)
        }
    
        // call the function
        fetchAccessToken()
        // make sure to catch any error
          .catch(console.error);
    
        } 
      }, [router])

  useEffect (() => {
    if (token) {

    // declare the data fetching function
    const fetchUserId = async () => {
      const data = await fetch('https://api.spotify.com/v1/me', {method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}});
      const json = await data.json()
      setUserId(json.id)
    }

    // call the function
    fetchUserId()
    // make sure to catch any error
      .catch(console.error);
  }    
  }, [token])

  const handleCreatePlaylist = async() => {
    const postPlaylist = async () => {
        const playlistBody = {
            "name": input,
            "description": "Playlist de testeo hecha desde app beta",
            "public": false
        }
        
        const data = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, body: JSON. stringify(playlistBody)});
        setSuccess(true)
    }
  
      // call the function
      postPlaylist()
      // make sure to catch any error
        .catch(console.error);
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <strong>Welcome!.</strong>
        <br></br>
        {success? <div>Playlist created Successfully!!!</div>:
        <>
        <input placeholder='Enter playlist name' value={input} onInput={e => setInput(e.target.value)}/>
        <button onClick={() => handleCreatePlaylist()} >Create Playlist</button>
        </>
        }
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
