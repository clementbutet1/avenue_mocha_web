import { useState, useEffect } from "react";
import Layout from "../../src/components/Layout";
import Router from "next/router";
import displayToastErrorByErrorCode from "../../utils/errors-management";
import TextInput from "../../src/components/TextInput";
import { useRouter } from 'next/router';
import Instance from "../../src/Instance";
import axios from "axios";

const CoffeesPage = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [caffeine, setCaffeine] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [errorAuthor, setErrorAuthor] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const UdpateCoffee = async () => {
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
    let res = await Instance.put(
      `/api/coffees/${id}`,
      raw,
      {
        headers: {
          Accept: "application/json",
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    );
    if (res.data) {
      Router.push("/");
    } else displayToastErrorByErrorCode(0);
  };

  const getCoffeeInfo = async () => {
    let res = await Instance.get(
      `/api/coffees/${id}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (res.data) {
      setAuthor(res?.data?.[0]?.creator);
      setTitle(res?.data?.[0]?.title);
      setQuantity(res?.data?.[0]?.quantity);
      setSugar(res?.data?.[0]?.sugar);
      setCaffeine(res?.data?.[0]?.caffeine);
    } else displayToastErrorByErrorCode(0);
  };

  useEffect(() => {
    getCoffeeInfo();
  }, [id]);

  return (
    <Layout title="Coffee">
      <div className="mx-auto w-full max-w-[550px] pt-10">
        <h2 className="text-gray-600 font-semibold pb-10 px-5">
          Modify your coffee
        </h2>
        <div className="px-5">
          <div className="mb-5">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
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
                <label className="mb-3 block text-base font-medium text-[#07074D]">
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
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              How many caffeine do you want (mg) ?
            </label>
            <input
              type="number"
              placeholder="5"
              value={caffeine}
              onChange={(e) => setCaffeine(e.target.value)}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
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
            <label className="mb-3 block text-base font-medium text-[#07074D]">
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
          <div>
            <button
              onClick={() => UdpateCoffee()}
              className="hover:shadow-form rounded-md bg-black py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Update Info
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoffeesPage;
