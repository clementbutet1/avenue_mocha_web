import { useState, useEffect } from "react";
import TextInput from "../../src/components/TextInput";
import ButtonAuthen from "../../src/components/authen/ButtonAuthen.js";
import ContactAuthen from "../../src/components/authen/ContactAuthen";
import SeperationOr from "../../src/components/authen/SeperationOrAuthen";
import { useAuth } from "../../src/context/AuthContext";
import Router from "next/router";
import { RenderThemeChanger } from "../../src/components/DarkMode";
import Layout from "../../src/components/Layout";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confPasswordError, setConfPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordForm, setPasswordForm] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const [fieldEmail, setFielEmail] = useState(false);
  const [fieldUsername, setFielUsername] = useState(false);
  const [fieldPassword, setFielPassword] = useState(false);
  const [fieldConfPassword, setFiedConfPassword] = useState(false);
  const [filedPhone, setFieldPhone] = useState(false);

  const { Register } = useAuth();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password) && password) {
      setPasswordForm(true);
      return true;
    } else {
      setPasswordForm(false);
      return false;
    }
  };

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const RegisterFunct = async () => {
    await Register(email, password, username, phone);
  };

  useEffect(() => {
    setFielEmail(false);
    setFielPassword(false);
    setFiedConfPassword(false);
    setFielUsername(false);
    setConfPasswordError(false);
    setPasswordError(false);
    setFieldPhone(false);
    setEmailError(false);
  }, [email, password, confPassword, username]);

  const CreateAccountFunct = () => {
    if (!phone) setFieldPhone(true);
    if (!email) setFielEmail(true);
    if (!username) setFielUsername(true);
    if (!password) setFielPassword(true);
    if (!confPassword) setFiedConfPassword(true);
    if (!email || !username || !password || !confPassword || !phone) return;
    if (validateEmail(email) === null) {
      setEmailError(true);
      return;
    }
    if (phone.length != 10) {
      setPhoneError(true);
      return;
    }
    if (validatePassword === true) {
      setPasswordForm(true);
      return;
    }
    if (password !== confPassword) {
      setPasswordError(true);
      setConfPasswordError(true);
      return;
    }
    RegisterFunct();
  };

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Layout>
      <div className="flex min-h-screen bg-base-300 dark:bg-black">
        <div className="flex flex-row w-full">
          <div className="flex flex-1 flex-col items-center justify-center relative">
            <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md pt-16">
              <div className="flex flex-col space-y-2 text-center">
                <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold dark:dark:text-slate-400">
                  Hello on Avenue Mocha
                </h2>
                <p className="text-md md:text-xl dark:dark:text-slate-400">
                  Create your account
                </p>
              </div>
              <div className="flex flex-col max-w-md space-y-5">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col max-w-md space-y-5"
                >
                  <div className="flex flex-1 flex-col">
                    <TextInput
                      value={email}
                      setValue={setEmail}
                      setError={setEmailError || setFielEmail}
                      error={emailError || fieldEmail}
                      placeHolder={"Email"}
                      type={"text"}
                    />
                    {emailError && (
                      <div className="flex item-start pl-5 text-red-600">
                        <p className="text-red text-center">Bad email</p>
                      </div>
                    )}
                    {fieldEmail && (
                      <div className="flex item-start pl-5 text-red-600">
                        <p className="text-red pt-1 text-center">
                          Field Missing
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <TextInput
                      value={username}
                      setValue={setUsername}
                      setError={setUsernameError || setFielUsername}
                      error={usernameError || fieldUsername}
                      placeHolder={"Username"}
                      type={"text"}
                    />
                    {usernameError && (
                      <div className="flex item-start pl-5 text-red-600">
                        <p className="text-red pt-1 text-center">
                          Username already use
                        </p>
                      </div>
                    )}
                    {fieldUsername && (
                      <div className="flex item-start pl-5 text-red-600">
                        <p className="text-red pt-1 text-center">
                          Field Missing
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <TextInput
                      value={phone}
                      setValue={setPhone}
                      setError={setPhoneError || setFieldPhone}
                      error={setPhoneError || setFieldPhone}
                      placeHolder={"Phone"}
                      type={"phone"}
                    />
                    {phoneError && (
                      <div className="flex item-start pl-5 text-red-600">
                        <p className="text-red pt-1 text-center">
                          The filed must containe 10 number
                        </p>
                      </div>
                    )}
                    {filedPhone && (
                      <div className="flex item-start pl-5 text-red-600">
                        <p className="text-red pt-1 text-center">
                          Field Missing
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <TextInput
                      value={password}
                      setValue={setPassword}
                      setError={setPasswordError || setFielPassword}
                      error={passwordError || fieldPassword}
                      placeHolder={"Password"}
                      type={"password"}
                    />
                    {passwordError && (
                      <div className="flex item-start pl-5 text-red-600">
                        <p className="text-red pt-1 text-center">
                          Passwords are different
                        </p>
                      </div>
                    )}
                    {passwordForm && (
                      <div className="flex item-start pl-5 text-red-600">
                        <p className="text-red pt-1 text-center">
                          Le mot de passe doit avoir au moins 8 caractères et
                          contenir au moins une lettre minuscule, une lettre
                          majuscule, un chiffre et un caractère spécial
                        </p>
                      </div>
                    )}
                    {fieldPassword && (
                      <div className="flex item-start pl-5 text-red-600">
                        <p className="text-red pt-1 text-center">
                          Field Missing
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <TextInput
                      value={confPassword}
                      setValue={setConfPassword}
                      setError={setConfPasswordError || setFiedConfPassword}
                      error={confPasswordError || fieldConfPassword}
                      placeHolder={"Password confirmation"}
                      type={"password"}
                    />
                    {confPasswordError && (
                      <div className="flex item-start pl-5 text-red-600">
                        <p className="text-red pt-1 text-center">
                          Passwords are different
                        </p>
                      </div>
                    )}
                    {fieldConfPassword && (
                      <div className="flex item-start pl-5 text-red-600">
                        <p className="text-red pt-1 text-center">
                          Field Missing
                        </p>
                      </div>
                    )}
                  </div>
                  <ButtonAuthen
                    functredi={CreateAccountFunct}
                    title={"Create your account"}
                  />
                </form>
                <SeperationOr />
                <ButtonAuthen
                  functredi={() => Router.push("/login")}
                  title={"Login"}
                />
              </div>
            </div>
            <ContactAuthen />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateAccount;
