
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useAuthRedirect = (user) => {
    const router = useRouter();
  
    useEffect(() => {
      const verifiedUser = user && user.emailVerified

      if (!verifiedUser) {
        router.push("/user/login");
      }
    }, [user, router]);
  
    return;
  };

  export default useAuthRedirect;