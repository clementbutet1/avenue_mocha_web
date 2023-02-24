import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import Instance from "../Instance";
import { parseCookies } from "nookies";

const UserContext = createContext({});

export const UserWrapper = ({ children }) => {
  const { currentUser, setCurrentUser } = useAuth();

  const updateUserData = async (email, username, phone, id) => {
    let raw = {
      email: email,
      username: username,
      phone: phone,
    };
    let res = await Instance.put(`/api/user/info/${id}`, raw);
    if (res.data) {
      setCurrentUser(res.data);
      return res.data;
    } else return 205;
  };

  return (
    <UserContext.Provider
      value={{
        updateUserData,
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
