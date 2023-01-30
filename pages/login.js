import { useEffect, useState } from "react";
import TextInput from "../src/components/TextInput";
import ButtonAuthen from "../src/components/authen/ButtonAuthen.js";
import SeperationOr from "../src/components/authen/SeperationOrAuthen";
import ContactAuthen from "../src/components/authen/ContactAuthen";
import ButtonCreateAccount from "../src/components/authen/ButtonCreateAccount";
import { useAuth } from "../src/context/AuthContext";
import { RenderThemeChanger } from "../src/components/DarkMode";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fieldEmail, setFielEmail] = useState(false);
  const [fieldPassword, setFielPassword] = useState(false);
  const [saveEmail, setSaveEmail] = useState(true);
  const { Login } = useAuth();

  const LoginFunct = async () => {
    if (!email) setFielEmail(true);
    if (saveEmail === false) {
      localStorage.setItem("emailLogin", email);
    } else {
      localStorage.removeItem("emailLogin");
      setSaveEmail(false);
    }
    if (!password) setFielPassword(true);
    if (!email || !password) return;
    await Login(email, password);
  };

  function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(() => {
    setFielEmail(false);
    setFielPassword(false);
  }, [email, password]);

  useEffect(() => {
    const getLocalStorage = async () => {
      let res = localStorage.getItem("emailLogin");
      if (res) {
        setSaveEmail(true);
        setEmail(res);
      }
    };
    getLocalStorage();
  }, []);

  return (
    <div className="flex min-h-screen bg-base-300 dark:bg-slate-800">
      <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
        <div className="flex flex-1 flex-col  justify-center space-y-10 max-w-md pt-5">
          <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold  dark:dark:text-slate-400">
              Hello on Avenue Mocha
            </h2>
            <h1 className="font-extrabold  text-wturqoise pt-5  dark:text-slate-400">
              Login to your account
            </h1>
          </div>
          <div className="flex flex-col max-w-md space-y-5">
            <form onSubmit={handleSubmit} className="flex flex-col max-w-md space-y-5">
              <div className="flex flex-1 flex-col">
                <TextInput
                  value={email}
                  setValue={setEmail}
                  setError={setFielEmail}
                  error={fieldEmail}
                  placeHolder={"Email"}
                  type={"text"}
                />
                {fieldEmail && (
                  <div className="flex item-start pl-5 text-red-600">
                    <p className="text-red pt-1 text-center">Field Missing</p>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col">
                <TextInput
                  value={password}
                  setValue={setPassword}
                  setError={setFielPassword}
                  error={fieldPassword}
                  placeHolder={"Password"}
                  type={"password"}
                />
                {fieldPassword && (
                  <div className="flex item-start pl-5 text-red-600">
                    <p className="text-red pt-1 text-center">Field Missing</p>
                  </div>
                )}
              </div>
              <div className="flex flex-1 pl-2 flex-row item-start justify-start align-center content-center">
                <input
                  value={saveEmail}
                  onChange={() => setSaveEmail(!saveEmail)}
                  type={"checkbox"}
                />
                <p className="text-red pl-2 text-center dark:text-white">
                  Save login email
                </p>
              </div>
              <ButtonAuthen title={"Login"} functredi={LoginFunct} />
            </form>
            <SeperationOr />
            <ButtonCreateAccount />
          </div>
        </div>
        <ContactAuthen />
        <div className="pb-10">
          <div className="flex justify-center align-center items-center">
            <RenderThemeChanger />
          </div>
          <p className="font-medium dark:text-slate-400">© 2023 Avenue_Mocha</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
