import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MainButton from '../components/elements/MainButton';
import 'tailwindcss/tailwind.css'

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

      <main className='flex flex-col justify-center items-center gap-4'>
        <strong className='text-2xl text-mwl-grey'>Welcome! Enter playlist name and click on button to create playlist.</strong>
        {success? <div className='text-lg text-mwl-grey'>Playlist created Successfully!!!</div>:
        <>
        <input placeholder='Enter playlist name' className='border border-gray-300' value={input} onInput={e => setInput(e.target.value)}/>
        <MainButton buttonName="Create Playlist" onClick={handleCreatePlaylist}></MainButton>
        </>
        }
      </main>
    </div>
  )
}
