import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export function Protected(WrappedComponent) {
  // Try to create a nice displayName for React Dev Tools.
  const Auth = (props) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) router.push("/");
        else if (
          (router.asPath == "/login" ||
            router.asPath == "/authentication/register") &&
          isAuthenticated
        ) {
          router.push("/");
        } else {
          setLoaded(true);
        }
      }
    }, [isLoading]);

    if (isLoading) {
      return <p>Loading</p>;
    }
    return loaded && <WrappedComponent {...props} />;
  };

  return Auth;
}

export default Protected;
