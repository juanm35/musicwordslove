import {useAuth } from "../../context/AuthContext"
import MainButton from '../../components/elements/MainButton'
import useUserVerificationRedirect from '../../hooks/useUserVerificationRedirect'
import Link from 'next/link';
import { useState } from 'react';
import { isValidEmail } from "../../helpers/validations"


export default function RecoverPassword() {

    const { currentUser, sendPassRecoveryEmail} = useAuth('');
    const [recoverEmail, setRecoverEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')

    useUserVerificationRedirect(currentUser)

    const recoverPassEmail = async () => {
        setLoading(true)
        setEmailError('');

        if (!isValidEmail(recoverEmail)) {
            setEmailError('Please enter a valid email address');
            setLoading(false)
            return;
        }
        
        try {
            await sendPassRecoveryEmail(recoverEmail)
            setLoading(false)
            setMessage(`If ${recoverEmail} has an associated account in MWL, you will receive an email for reseting your password!`)
        } catch (error) {
            switch (error.code){
                case "auth/invalid-email":
                    setEmailError("Invalid email address. Please enter a valid email.")
                    break;
                case "auth/user-not-found":
                    setLoginError("User not found. Please check your email and try again.")
                    break;
                default:
                    setEmailError("An error occurred. Please try again later.")
                    break;
            }
            setLoading(false)
        }
    }

    

    return(
        <div className="flex items-center justify-center h-screen">           
           <div className="bg-gray-200 w-100 m-auto rounded-lg p-4 ">
                <>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-2xl"><strong>Recover Password</strong></p>
                        <p className="text-lg py-1">Enter your email: </p>
                        <input
                        value={recoverEmail}
                        onChange={(e) => setRecoverEmail(e.target.value)}
                        className="text-lg py-1"/>
                        {emailError && <div className="text-red-500">{emailError}</div>}
                        {loading? <div>Loading...</div>:
                        <div className={`flex ${message? 'flex-col justify-center items-center': ''} gap-2 py-2`}>
                            <Link href="/user/login">
                                <MainButton buttonName="Log in"></MainButton>
                            </Link>
                            {message? <div className="text-black">{message}</div>:   <MainButton onClick={recoverPassEmail} buttonName="Recover Password"></MainButton>}
                        </div>
                        }
                    </div>
                </>
           </div>
        </div>
    )
}