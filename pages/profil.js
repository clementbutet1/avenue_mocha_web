import React, { createContext, useState, useContext, useEffect } from "react";
import Layout from "../src/components/Layout";
import { useUser } from "../src/context/UserContext";
import { toast } from "react-toastify";
import Protected from "../src/hoc/Protected";
import TextInput from "../src/components/TextInput";
import { useAuth } from "../src/context/AuthContext";

const ProfilPage = () => {
  const { currentUser, getUserData } = useAuth();
  const { updateUserData } = useUser();
  const [username, setUsername] = useState(currentUser?.username);
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [email, setEmail] = useState(currentUser?.email);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const [fieldEmail, setFielEmail] = useState(false);
  const [fieldUsername, setFielUsername] = useState(false);
  const [fieldPhone, setFieldPhone] = useState(false);

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
    if (!phone) setFieldPhone(true);
    if (!email || !username || !phone) return;
    if (validateEmail(email) === null) {
      setEmailError(true);
      return;
    }
    if (phone.length != 10) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setFieldPhone(false);
    setFielEmail(false);
    setFielUsername(false);
    setEmailError(false);
    await updateUserData(email, username, phone, currentUser?._id);
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

  useEffect(() => {
    getUserData();
  }, []);

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
                    <div className="flex flex-1 flex-col">
                      <TextInput
                        value={username}
                        setValue={setUsername}
                        setError={setFielUsername}
                        error={fieldUsername}
                        placeHolder={"Username"}
                        type={"text"}
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
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Phone
                    </label>
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
                      {fieldPhone && (
                        <div className="flex item-start pl-5 text-red-600">
                          <p className="text-red pt-1 text-center">
                            Field Missing
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Email address
                    </label>
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
