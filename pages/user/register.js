import {useAuth } from "../../context/AuthContext"
import { useState, useEffect } from 'react';
import MainButton from '../../components/elements/MainButton'
import useUserVerificationRedirect from '../../hooks/useUserVerificationRedirect'
import {createUserProfileAnex} from '../../firebase/firestore'
import { isValidEmail } from "../../helpers/validations"



export default function Login() {

    const { currentUser, CreateUser, SendEmailVerification} = useAuth();

    const [createUserEmail, setCreateUserEmail] = useState('');
    const [createUserPassword, setCreateUserPassword] = useState('');
    const [createNick, setCreateNick] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    useUserVerificationRedirect(currentUser)

    useEffect(() => {
        console.log("ES AGAAAA", currentUser)
      }, [currentUser]);
    
    const createUser = async () => {
        setLoading(true)
        setEmailError('');
        setPasswordError('');

        if (!createUserEmail) {
            setEmailError('Please enter your email');
            setLoading(false)
            return;
        }

        if (!createUserPassword) {
            setPasswordError('Please enter your password');
            setLoading(false)
            return;
        }

        if (createUserPassword.length < 6) {
            setPasswordError('Password should be at least 6 characters long.');
            setLoading(false)
            return;
        }

        if (!isValidEmail(createUserEmail)) {
            setEmailError('Please enter a valid email address');
            setLoading(false)
            return;
        }

        try {

            const userCredentials = await CreateUser(createUserEmail, createUserPassword)
            await SendEmailVerification()
            const user = {
                id: userCredentials.user.uid,
                displayName: createNick,
                type: 'regular',
                imageUrl: ''
            }
            const userProfile = await createUserProfileAnex(user)
            setLoading(false)
            console.log("USER PROFILE: ", userProfile)
        } catch (error) {
            switch (error.code){
                case "auth/invalid-email":
                    setLoginError("Invalid email address. Please enter a valid email.")
                    break;
                case "auth/invalid-password":
                    setLoginError("Invalid password. Please enter a valid password.")
                    break;
                case "auth/email-already-in-use":
                    setLoginError ("Email already exists. Please choose a different email.")
                    break;
                default:
                    setLoginError("An error occurred. Please try again later.")
                    break;
            }
            setLoading(false)
        }
        
     }


    return(
        <div className="flex items-center justify-center h-screen">           
           <div className="bg-gray-200 w-100 m-auto rounded-lg p-4 ">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-2xl"><strong>Register User</strong></p>
                    <div className="w-full py-2">
                        <div className="text-lg">Email*</div>
                        <input className="w-full" 
                        value={createUserEmail}
                        onChange={(e) => setCreateUserEmail(e.target.value)}
                        />
                        {emailError && <div className="text-red-500">{emailError}</div>}
                    </div>
                    <div className="w-full py-2">
                        <div className="text-lg">Pass*</div>
                        <input className="w-full"
                        value={createUserPassword}
                        onChange={(e) => setCreateUserPassword(e.target.value)}
                        />
                        {passwordError && <div className="text-red-500">{passwordError}</div>}
                    </div>
                    <div className="w-full py-2">
                        <div className="text-lg">Name</div>
                        <input className="w-full"
                        value={createNick}
                        onChange={(e) => setCreateNick(e.target.value)}
                        />
                    </div>
                    {loginError && <div className="text-red-500">{loginError}</div>}
                    {loading?
                        <div>Loading...</div>:
                        <>
                            <MainButton onClick={createUser} buttonName="Register User"></MainButton>
                        </>
                    }
                </div>
           </div>
        </div>
    )
}