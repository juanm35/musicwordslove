
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useUserVerificationRedirect = (user) => {
    const router = useRouter();
  
    useEffect(() => {
      if (user && user.emailVerified) {
        router.push("/");
      } else if (user) {
        router.push("/user/verify-email");
      }

    }, [user, router]);
  
    return;
  };

  export default useUserVerificationRedirect;