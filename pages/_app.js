
import { AuthContextProvider } from '../context/AuthContext';
import 'tailwindcss/tailwind.css'

export default function MyApp({ Component, pageProps }) {
    return(
        <AuthContextProvider>
            <Component {...pageProps} />
        </AuthContextProvider>
    )
  }