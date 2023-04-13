import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';

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
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <strong>MUSICWORDSLOVE.</strong>
        <br></br>
        <div>Coming soon...</div>
        <br></br>
        <a href={spotifyUrl}>
        <button >Log in</button>
        </a>
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
