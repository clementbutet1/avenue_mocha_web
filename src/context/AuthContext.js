import React, { createContext, useState, useContext, useEffect } from "react";
import displayToastErrorByErrorCode from "../utils/errors-management";
import Router from "next/router";
import Instance from "../Instance";
import { toast } from "react-toastify";
const AuthContext = createContext({});

export const AuthWrapper = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const Register = async (email, password, username, phone) => {
    setIsLoading(true);
    let raw = {
      email: email,
      password: password,
      username: username,
      phone: phone,
    };
    let res = await Instance.post(`/api/user/create`, raw);
    if (res.status === 201) {
      setIsLoading(false);
      Router.push("/login");
    } else if (res.data.error === "The user already exist")
      displayToastErrorByErrorCode(1);
    else if (res.data.message === "Problem with password")
      displayToastErrorByErrorCode(2);
    else displayToastErrorByErrorCode(0);
  };

  // const Login = async (email, password) => {
  //   setIsLoading(true);
  //   const { data } = await Instance.post(
  //     "/api/user/login",
  //     {
  //       email,
  //       password,
  //     }
  //   );
  //   if (data.error === "User not found") displayToastErrorByErrorCode(3);
  //   else if (data.error === "Password incorrect")
  //     displayToastErrorByErrorCode(4);
  //   else if (data.message === "Auth successful") {
  //     console.log((data))
  //     setCurrentUser(data.user);
  //     setIsLoading(false);
  //     Router.push("/");
  //   } else displayToastErrorByErrorCode(0);
  // };

  const Login = async (email, password) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      email: email,
      password: password,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://avenuemochaapi.herokuapp.com/api/user/login", requestOptions)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        data = JSON.parse(data);
        if (data.error === "User not found") displayToastErrorByErrorCode(3);
        else if (data.error === "Password incorrect")
          displayToastErrorByErrorCode(4);
        else if (data.message === "Auth successful") {
          setCurrentUser(data.user);
          setIsLoading(false);
          Router.push("/");
        } else displayToastErrorByErrorCode(0);
      })
      .catch((error) => console.log("error", error));
  };

  const getUserData = async () => {
    if (currentUser) {
      let res = await Instance.get(`/api/user/info/${currentUser?._id}`);
      if (res?.data) {
        console.log(res?.data);
        setCurrentUser(res?.data[0]);
        return res.data[0];
      } else return 205;
    }
  };

  const AutoLogin = async () => {
    try {
      setIsLoading(true);
      const { data } = await Instance.get("/api/user/autologin");
      if (data.message === "Auto Login success") {
        setCurrentUser(data.user);
        setIsLoading(false);
        getUserData();
      } else if (data.message === "No token provided !") {
        setIsLoading(false);
        setCurrentUser(undefined);
        Router.push("/");
      }
    } catch {
      setIsLoading(false);
      setCurrentUser(undefined);
      Router.push("/");
    }
  };

  const logout = async () => {
    setIsLoading(true);
    Router.push("/login");
    const { data } = await Instance.get("/api/user/logout");
    if (data.message === "Disconnect success") {
      setCurrentUser(undefined);
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
        getUserData,
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
