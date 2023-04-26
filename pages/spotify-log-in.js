import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MainButton from '../components/elements/MainButton';
import 'tailwindcss/tailwind.css'
import {fetchAccessToken, fetchUserId} from '../spotify/authorization'
import {postPlaylist, searchSong} from '../spotify/postPlaylist'
import PlaylistsBuilder from '../components/PlaylistsBuilder'
import Playlist from '../components/Playlist'

export default function logIn() {
    const router = useRouter()
    const [token, setToken] = useState("")
    const [userId, setUserId] = useState("")
    const [playlistName, setPlaylistName] = useState('');
    const [success, setSuccess] = useState(false);


    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
      console.log("AGAAA PLAYLIST: ", playlist, typeof playlist )
    }, [playlist])

  // GETTING ACCESS TOKEN FOR THE USER
  useEffect (() => {
      const {code} = router.query
      if (code){
        async function fetchData(){
          try{
          const result = await fetchAccessToken(code);
          setToken(result)
          } catch (error) {
            console.error(error)
          }
        }

        fetchData()
      }   

  }, [router])

  // GETTING USER ID
  useEffect (() => {
    if (token) {
      async function fetchData(){
        try{
          const result = await fetchUserId(token);
          setUserId(result)
        } catch (error) {
          console.error(error)
        }
      }    

      fetchData()
    }
  }, [token])

  // CREATE PLAYLIST HANDLER
  const handleCreatePlaylist = async () => {
    if (playlist && playlist.length >0) {

      const sUris = await Promise.all (playlist.map( async (song) => {
        const [songName, artistName] = song.split(": ");
        const songId = await searchSong(`${songName} ${artistName}`, token).catch(console.error)
        return songId
      }))
      const songsBody =  [
        {
          uris: sUris
        }
      ]  

      postPlaylist(playlistName, token, userId, songsBody, setSuccess).catch(console.error)
    }
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex flex-col justify-center items-center gap-4 w-full'>
        {success? 
          
          <div className='text-lg text-mwl-grey'>Playlist created Successfully!!!</div>:        
          playlist && playlist.length > 0 ?
            <>
              <strong className='text-2xl text-mwl-grey'>You are almost there! Enter playlist name and generate your playlist!</strong>
              <Playlist songs={playlist}></Playlist>
              <input placeholder='Enter playlist name' className='border border-gray-300' value={playlistName} onInput={e => setPlaylistName(e.target.value)}/>
              <MainButton buttonName="Create Playlist" onClick={handleCreatePlaylist}></MainButton>
            </>
            : 
            <>
              <strong className='text-2xl text-mwl-grey'>How would you like your playlist?</strong>
              <PlaylistsBuilder setPlaylist={setPlaylist}></PlaylistsBuilder>
            </>
        }
      </main>
    </div>
  )
}
