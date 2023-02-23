import React, { createContext, useState, useContext } from "react";
import Layout from "../src/components/Layout";
import { useUser } from "../src/context/UserContext";
import { toast } from "react-toastify";
import Protected from "../src/hoc/Protected";

const ProfilPage = () => {
  const { userData, updateUserData } = useUser();
  const [username, setUsername] = useState(userData?.username);
  const [email, setEmail] = useState(userData?.email);
  const [emailError, setEmailError] = useState(false);

  const [fieldEmail, setFielEmail] = useState(false);
  const [fieldUsername, setFielUsername] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const updateProfil = async () => {
    if (!email) setFielEmail(true);
    if (!username) setFielUsername(true);
    if (!email || !username) return;
    if (validateEmail(email) === null) {
      setEmailError(true);
      return;
    }
    setFielEmail(false);
    setFielUsername(false);
    setEmailError(false);
    await updateUserData(email, username);
    toast.success("Success Modify", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Layout title="Profil">
      <div className="relative flex flex-col h-screen dark:bg-black min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white dark:bg-black mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
            <button
              className="bg-blueGray-700 border dark:border-white dark:text-white active:bg-blueGray-600 text-black font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => updateProfil()}
            >
              Modify
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            User Information
          </h6>
          <div className="flex flex-row">
            <div className="flex items-center justify-center w-1/4">
              <div className="w-full px-4 py-4 flex justify-center">
                <div className="relative">
                  <img
                    alt="..."
                    src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                    className="shadow-xl rounded-full  border-none mx-auto"
                  />
                </div>
              </div>
            </div>

            <div className="w-3/4">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Username
                    </label>
                    <input
                      type="phone"
                      className={
                        fieldUsername
                          ? "border-red-500 border-1 px-3 py-3 placeholder-blueGray-300 dark:text-black text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          : "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 dark:text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      }
                      value={username}
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {fieldUsername && (
                      <div className="flex item-start pl-5 text-red-600">
                        <p className="text-red pt-1 text-center">
                          Field Missing
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4 dark:bg-black">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Email address
                    </label>
                    <input
                      type="email"
                      className={
                        (emailError || fieldEmail)
                          ? "border-red-500 border-1 px-3 py-3 placeholder-blueGray-300 dark:text-black text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          : "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 dark:text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      }
                      value={email}
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Protected(ProfilPage);
