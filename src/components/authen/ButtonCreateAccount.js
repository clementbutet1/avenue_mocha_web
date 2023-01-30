import React from "react";
import ButtonAuthen from "./ButtonAuthen.js";
import Router from "next/router";

const ButtonCreateAccount = () => {
  return (
    <ButtonAuthen
      functredi={() => Router.push("/authentication/register")}
      title={"Create your account"}
    />
  );
};

export default ButtonCreateAccount;
