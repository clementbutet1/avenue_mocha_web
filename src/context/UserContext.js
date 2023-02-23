import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import Instance from "../Instance";

const UserContext = createContext({});

export const UserWrapper = ({ children }) => {
  const { currentUser, setCurrentUser } = useAuth();

  const updateUserData = async (email, username, phone, id) => {
    let raw = {
      email: email,
      username: username,
      phone: phone,
    };
    let res = await Instance.put(`/api/user/info/${currentUser?._id}`, raw, {
      headers: {
        Accept: "application/json",
      },
    });
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
