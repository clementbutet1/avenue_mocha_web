import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { useAuth } from "../context/AuthContext";
import { Router } from "next/router";
import { RenderThemeChanger } from "../components/DarkMode";

const Layout = ({ children, title = "This is the default title" }) => {
  const { logout, isAuthenticated } = useAuth();

  const FunctLogout = async () => {
    await logout();
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav className="flex items-center justify-between flex-wrap bg-teal p-6 bg-black dark:border-b-2 dark:border-b-white">
          <div className="flex items-center flex-no-shrink text-white mr-6">
            <span className="font-semibold text-2xl tracking-tight">
              Avenue Mocha
            </span>
          </div>
          <div className="block lg:hidden"></div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <Link
                href="/"
                className="text-white block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
              >
                Home
              </Link>
              {(isAuthenticated) &&
                <Link
                  href="/coffee-commands"
                  className="text-white block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
                >
                  Commands Coffee
                </Link>
              }
              <Link
                href="/about"
                className="text-white block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
              >
                About
              </Link>
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="block lg:hidden"></div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
              <div className="text-sm lg:flex-grow">
                {isAuthenticated &&
                  <Link
                    href="/profil"
                    className="text-white block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
                  >
                    Profil
                  </Link>
                }
                {(!isAuthenticated) &&
                  <Link
                    href="/login"
                    className="text-white block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
                  >
                    Login
                  </Link>
                }
                {(!isAuthenticated) &&
                  <Link
                    href="/authentication/register"
                    className="text-white block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
                  >
                    Create Account
                  </Link>
                }
              </div>
            </div>
           {(isAuthenticated) && <button onClick={() => FunctLogout()} className="pl-10 pr-10">
              <a className="inline-block text-sm px-4 py-2 hover:text-black leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0">
                Logout
              </a>
            </button>}
            <RenderThemeChanger />
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Layout;
