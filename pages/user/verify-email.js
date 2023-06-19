import {useAuth } from "../../context/AuthContext"
import MainButton from '../../components/elements/MainButton'
import useNoUserRedirect from '../../hooks/useNoUserRedirect'
import { useState } from 'react';



export default function Login() {

    const { currentUser, Logout, SendEmailVerification } = useAuth();
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useNoUserRedirect(currentUser)

     const logoutUser = async () => {
        await Logout()
     }

     const sendEmail = async() => {
        setEmailSent(false)
        setLoading(true)

        try {
            await SendEmailVerification()
            setLoading(false)
            setEmailSent(true)
        } catch (error) {
            setError("An error has occured. Please try again later.")
            setLoading(false)
        }

     }
 
    return(
        <div className="flex items-center justify-center h-screen">           
           <div className="bg-gray-200 w-100 m-auto rounded-lg p-4 ">
                <>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-2xl"><strong>Verify your email!</strong></p>
                        <p className="text-lg py-1">Check your email address {currentUser?.email} for verification.</p>
                        <p className="text-lg py-1">If you havent received any email you can resend it by clicking on "verify email" </p>
                        {loading? <div>Loading...</div>:
                            <>
                                <div className="flex gap-2 py-2">
                                    <MainButton onClick={() => logoutUser()} buttonName="Sign out"></MainButton>
                                    <MainButton onClick={() => sendEmail()} buttonName="Verify email"></MainButton>
                                </div>
                            </>
                        }
                        {error && <div className="text-red-500">{error}</div>}
                        {emailSent && <div className="text-red-500">Email sent!</div>}
                    </div>
                </>
           </div>
        </div>
    )
}