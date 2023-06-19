import Head from 'next/head';
import NavBar from '../components/NavBar'
import {spotifyAuthorizationUrl} from '../spotify/authorization'
import MainButton from '../components/elements/MainButton'
import SuccessCase from '../components/SuccessCase'
import {useAuth} from "../context/AuthContext"
import Link from 'next/link';
 
export default function Home() {

  const { currentUser } = useAuth();
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar ></NavBar>

      <main className=' flex flex-col justify-center items-center pt-12'>
        <div className='flex flex-col justify-center items-center w-3/6'>
          <h1><strong className="text-7xl text-mwl-grey">musicwordslove</strong><strong className='text-mwl-orange text-6xl'>.</strong></h1>
          <h2 className='mt-4 text-gray-800 font-lexend font-light text-lg font-weight-300 tracking-wider leading-9 text-center'>Enjoy your personalized playlist within seconds with AI technology. Share and add it to your music streaming service with just one click.</h2>
        </div>
        {currentUser && currentUser.emailVerified?
        <a href={spotifyAuthorizationUrl} className='py-12'>
          <MainButton buttonName="Get Started"></MainButton>
        </a>:
        <Link href="/user/login">
          <MainButton  buttonName="Log In"></MainButton>
        </Link>
        }
        <br></br>
        <SuccessCase></SuccessCase>
      </main>
    </div>
  )
}
