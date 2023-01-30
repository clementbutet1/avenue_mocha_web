import React, { createContext, useState, useContext, useEffect } from "react";
import displayToastErrorByErrorCode from "../utils/errors-management";
import Router from "next/router";
import Instance from "../Instance";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import { useCookies } from 'react-cookie';

const AuthContext = createContext({});

export const AuthWrapper = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [ cookie, setCookie, removeCookie] = useCookies(['cookie-name']);

  const Register = async (email, password, username) => {
    setIsLoading(true);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = {
      email: email,
      password: password,
      username: username,
    };
    let res = await Instance.post(`/api/user/create`, raw, myHeaders);
    if (res.status === 201) {
      setIsLoading(false);
      Router.push("/login");
    } else if (res.data.error === "The user already exist")
      displayToastErrorByErrorCode(1);
    else if (res.data.message === "Problem with password")
      displayToastErrorByErrorCode(2);
    else displayToastErrorByErrorCode(0);
  };

  const Login = async (email, password) => {
    setIsLoading(true);
    const { data } = await Instance.post("/api/user/login", {
      email,
      password,
    });
    if (data.error === "User not found") displayToastErrorByErrorCode(3);
    else if (data.error === "Password incorrect")
      displayToastErrorByErrorCode(4);
    else if (data.message === "Auth successful") {
      localStorage.setItem("token", data.token);
      setCookie("token",  data.token);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + data.token;
      setCurrentUser(data.user);
      setIsLoading(false);
      Router.push("/");
    } else displayToastErrorByErrorCode(0);
  };

  const AutoLogin = async () => {
    if (
      router.route != "/login" &&
      !router.asPath.startsWith("/authentication")
    ) {
      setIsLoading(true);
      const { data } = await Instance.get("/api/user/autologin", {
        headers: {
          Accept: "application/json",
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      });
      if (data.message === "Auto Login success") {
        setCurrentUser(data.user);
        setIsLoading(false);
        Router.push("/");
      } else if (data.message === "No token provided !") {
        setIsLoading(false);
        setCurrentUser(undefined);
        Router.push("/login");
      }
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setCurrentUser(undefined);
    Router.push("/login");
    const { data } = await Instance.get("/api/user/logout", {
      headers: {
        Accept: "application/json",
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    });
    console.log(data);
    if (data.message === "Disconnect success") {
      setIsLoading(false);
      toast.success("Disconnect", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    AutoLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        Register,
        Login,
        logout,
        currentUser,
        setCurrentUser,
        isAuthenticated: currentUser ? true : false,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
export function useAuth() {
  return useContext(AuthContext);
}
