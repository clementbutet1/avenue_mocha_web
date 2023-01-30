import React from "react";
import AuthWrapper from "./AuthContext";
import UserWrapper from "./UserContext";

const MainContext = ({ children }) => {
  return (
    <>
      <AuthWrapper>
        <UserWrapper>{children}</UserWrapper>
      </AuthWrapper>
    </>
  );
};

export default MainContext;
