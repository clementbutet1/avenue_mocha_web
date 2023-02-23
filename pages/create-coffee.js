import { useState } from "react";
import Layout from "../src/components/Layout";
import Router from "next/router";
import displayToastErrorByErrorCode from "../utils/errors-management";
import TextInput from "../src/components/TextInput";
import Instance from "../src/Instance";
import axios from "axios";
import Protected from "../src/hoc/Protected";
import { useAuth } from "../src/context/AuthContext";

const CreateCoffee = () => {
  const { currentUser } = useAuth();
  const {
    query: { titlecoffee },
  } = Router;
  const [author, setAuthor] = useState(currentUser?.username);
  const [title, setTitle] = useState(titlecoffee);
  const [caffeine, setCaffeine] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [errorAuthor, setErrorAuthor] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);

  const createNewCoffee = async () => {
    if (!author) {
      setErrorAuthor(true);
      return;
    }
    if (!title) {
      setErrorTitle(true);
      return;
    }
    let raw = {
      creator: author,
      title: title,
      sugar: sugar,
      caffeine: caffeine,
      quantity: quantity,
    };
    let res = await Instance.post(`/api/coffees/create`, raw);
    if (res.data) {
      Router.push("/coffee-commands");
    } else displayToastErrorByErrorCode(0);
  };

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Layout title="Create coffee">
      <div className="mx-auto w-full h-screen max-w-[550px] pt-10">
        <h2 className="text-gray-600 font-semibold pb-10 px-5 dark:text-white">
          Create your coffee
        </h2>
        <form onSubmit={handleSubmit} className="px-5">
          <div className="mb-5">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <label className="mb-3 block text-base font-medium text-[#07074D] dark:text-white">
                  Author
                </label>
                <TextInput
                  value={author}
                  setValue={setAuthor}
                  setError={setErrorAuthor}
                  error={errorAuthor}
                  placeHolder={"Author"}
                  type={"text"}
                />
                {errorAuthor && (
                  <div className="flex item-start pl-5 text-red-600">
                    <p className="text-red pt-1 text-center">Field Missing</p>
                  </div>
                )}
              </div>
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D] dark:text-white">
                  Titre
                </label>
                <TextInput
                  value={title}
                  setValue={setTitle}
                  setError={setErrorTitle}
                  error={errorTitle}
                  placeHolder={"Title"}
                  type={"text"}
                />
                {errorTitle && (
                  <div className="flex item-start pl-5 text-red-600">
                    <p className="text-red pt-1 text-center">Field Missing</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D] dark:text-white">
              How many caffeine do you want (mg) ?
            </label>
            <input
              type="number"
              placeholder="5"
              min="0"
              max="10"
              value={caffeine}
              onChange={(e) => setCaffeine(e.target.value)}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D] dark:text-white">
              How many sugar do you want (mg) ?
            </label>
            <input
              type="number"
              placeholder="5"
              value={sugar}
              onChange={(e) => setSugar(e.target.value)}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D] dark:text-white">
              How many coffee do you want ?
            </label>
            <input
              type="number"
              placeholder="5"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="bg-red-600 flex justify-center align-center">
            <button
              onClick={createNewCoffee}
              className="hover:shadow-form rounded-md w-full dark:border-white border bg-black py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Protected(CreateCoffee);
