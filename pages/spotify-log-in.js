import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MainButton from '../components/elements/MainButton';
import 'tailwindcss/tailwind.css'
import {fetchAccessToken, fetchUserId} from '../spotify/authorization'
import {postPlaylist, searchSong} from '../spotify/postPlaylist'

export default function logIn() {
    const router = useRouter()
    const [token, setToken] = useState("")
    const [userId, setUserId] = useState("")
    const [playlistName, setPlaylistName] = useState('');
    const [success, setSuccess] = useState(false);
    const [songName, setSongName] = useState('');
    const [songArtist, setSongArtist] = useState('');
    // const [songId, setSongId] = useState('');

  useEffect (() => {
      const {code} = router.query
      if (code){
        fetchAccessToken(code, setToken).catch(console.error);
      }   

  }, [router])

  useEffect (() => {
    if (token) {
      fetchUserId(token, setUserId).catch(console.error);
    }    
    
  }, [token])

  const handleCreatePlaylist = async () => {
    const songId = await searchSong(`${songName} ${songArtist}`, token)
    const songsBody =  [
      {
        uris: [ 
          songId
        ]
      }
    ]    
     postPlaylist(playlistName, token, userId, songsBody, setSuccess).catch(console.error)
    
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
        <input placeholder='Enter playlist name' className='border border-gray-300' value={playlistName} onInput={e => setPlaylistName(e.target.value)}/>
        <div className='flex gap-8'>
          <input placeholder='Enter song name' className='border border-gray-300' value={songName} onInput={e => setSongName(e.target.value)}/>
          <input placeholder='Enter song artist' className='border border-gray-300' value={songArtist} onInput={e => setSongArtist(e.target.value)}/>
        </div>
        <MainButton buttonName="Create Playlist" onClick={handleCreatePlaylist}></MainButton>
        </>
        }
      </main>
    </div>
  )
}
