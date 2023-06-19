import {useAuth } from "../../context/AuthContext"
import { useState, useEffect } from 'react';
import MainButton from '../../components/elements/MainButton'
import useUserVerificationRedirect from '../../hooks/useUserVerificationRedirect'
import Link from 'next/link';
import { isValidEmail } from "../../helpers/validations"



export default function Login() {

    const { currentUser, LoginWithEmailAndPass } = useAuth();

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    const submitUser = async () => {
        setLoading(true)
        setEmailError('');
        setPasswordError('');

        if (!userEmail) {
            setEmailError('Please enter your email');
            setLoading(false)
            return;
        }

        if (!userPassword) {
            setPasswordError('Please enter your password');
            setLoading(false)
            return;
        }

        if (!isValidEmail(userEmail)) {
            setEmailError('Please enter a valid email address');
            setLoading(false)
            return;
        }

       try {
        await LoginWithEmailAndPass(userEmail, userPassword)
        setLoading(false)
       } catch (error) {
        switch (error.code){
            case "auth/invalid-email":
            setLoginError("Invalid email address. Please enter a valid email.")
            break;
        case "auth/invalid-password":
            setLoginError("Invalid password. Please enter a valid password.")
            break;
        case "auth/user-not-found":
            setLoginError("User not found. Please check your email and try again.")
            break;
        case "auth/wrong-password":
            setLoginError("Incorrect password. Please try again.")
            break;
        default:
            setLoginError("An error occurred. Please try again later.")
            break;
        }
        setLoading(false)
       }
    }

    useUserVerificationRedirect(currentUser)

    useEffect(() => {
        console.log("Current User: ", currentUser)
      }, [currentUser]);

    return(
        <div className="flex items-center justify-center h-screen">           
           <div className="bg-gray-200 w-100 m-auto rounded-lg p-4 ">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-2xl"><strong>Log In</strong></p>
                    <div className="w-full py-2">
                        <div className="text-lg">Email*</div>
                        <input className="w-full" 
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        />
                        {emailError && <div className="text-red-500">{emailError}</div>}
                    </div>
                    <div className="w-full py-2">
                        <div className="text-lg">Pass*</div>
                        <input className="w-full"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        />
                        {passwordError && <div className="text-red-500">{passwordError}</div>}
                    </div>
                    {loginError && <div className="text-red-500">{loginError}</div>}
                    {loading?
                        <div>Loading...</div>:
                        <>
                            <Link href="/user/register">
                                <div className="hover:underline cursor-pointer py-2">Register Now!</div> 
                            </Link>
                            <Link href="/user/recover-password">
                                <div className="text-sm hover:underline cursor-pointer py-2">Forgot your password?</div>
                            </Link>
                            <MainButton onClick={submitUser} buttonName="Login"></MainButton>
                        </>
                    }
                </div>
           </div>
        </div>
    )
}