import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./AuthContext";
import Instance from "../Instance";

const UserContext = createContext({});

export const UserWrapper = ({ children }) => {
  const { currentUser } = useAuth();
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(undefined);

  const getUserData = async () => {
    let res = await Instance.get(
      `/api/user/info/${userData?._id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data) return res.data;
    else return 205;
  };

  const updateUserData = async (email, username) => {
    let raw = {
      email: email,
      username: username,
    };
    let res = await Instance.put(
      `/api/user/info/${userData?._id}`,
      raw,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (res.data) return res.data;
    else return 205;
  };

  useEffect(() => {
    if (currentUser != undefined) {
      setUserData(currentUser);
    }
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{
        updateUserData,
        getUserData,
        userData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserWrapper;
export function useUser() {
  return useContext(UserContext);
}
