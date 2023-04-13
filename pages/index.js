import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'
import NavBar from '../components/NavBar'
import MainButton from '../components/elements/MainButton'

export default function Home() {

  const [res, setRes] = useState({access_token: "",token_type: "", expires_in: null})
  useEffect (() => {
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

    // declare the data fetching function
    const fetchData = async () => {
      const data = await fetch('https://accounts.spotify.com/api/token', {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: formBody});
      const json = await data.json()
      setRes(json)
    }

    // call the function
    fetchData()
    // make sure to catch any error
      .catch(console.error);

    
  }, [])

  // const handleClick = async () => {
  //   const data = await fetch(`https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&scope=%0Auser-read-email%20user-read-private`, {method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': `bearer ${res.access_token}`}});
  //     }

     const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&scope=%0Auser-read-email%20user-read-private%20playlist-modify-public%20playlist-modify-private`

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar ></NavBar>

      <main className=' flex flex-col justify-center items-center'>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className='flex flex-col justify-center items-center w-3/6'>
          <h1><strong className="text-7xl text-mwl-grey">musicwordslove</strong><strong className='text-mwl-orange text-6xl'>.</strong></h1>
          <h2 className='mt-4 text-lg text-mwl-grey'>Enjoy your personalized playlist within seconds with AI technology. Share and add it to your music streaming service with just one click.</h2>
        </div>
        <br></br>
        <a href={spotifyUrl}>
          <MainButton buttonName="Create Playlist"></MainButton>
        </a>
      </main>
    </div>
  )
}
