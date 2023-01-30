import "../styles/globals.css";
import MainLayout from "../src/components/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainContext from "../src/context/MainContext";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // setTimeout(() => {
    setLoaded(true);
    // }, 3000);
  }, []);

  return (
    <>
      {loaded ? (
        <>
          <ToastContainer />
          <ThemeProvider enableSystem={true} attribute="class">
            <MainContext>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </MainContext>
          </ThemeProvider>
        </>
      ) : (
        <>
          <div className="fixed top-0 left-0 right-0 bottom-0 w-full bg-base-100 h-screen z-50 overflow-hidden opacity-75 flex flex-col items-center justify-center">
            <h2 className="text-center text-black text-xl font-semibold">
              Loading...
            </h2>
            <p className="w-1/3 text-center text-black">
              {"This may take a few seconds, please don't close this page."}
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default MyApp;
