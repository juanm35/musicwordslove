
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useNoUserRedirect = (user) => {
    const router = useRouter();
  
    useEffect(() => {
      if (user && user?.emailVerified) {
        router.push("/");
      } else if (!user) {
        router.push("/user/login");
      }

    }, [user, router]);
  
    return;
  };

  export default useNoUserRedirect;