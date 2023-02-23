import { useState, useEffect } from "react";
import Layout from "../src/components/Layout";
import Protected from "../src/hoc/Protected";
import Router from "next/router";
import displayToastErrorByErrorCode from "../utils/errors-management";
import moment from "moment";
import Instance from "../src/Instance";
import axios from 'axios';

const CoffeeCommands = () => {
  const [data, setData] = useState([]);

  const getAllCoffe = async () => {
    console.log("token maybe : " + axios.defaults.headers.common["Authorization"]);
    let res = await Instance.get(
      `/api/coffees`,
      {
        headers: {
          Accept: "application/json",
          Authorization: axios.defaults.headers.common["Authorization"]
        },
      }
    );
    if (res?.data) {
      setData(res.data);
    } else displayToastErrorByErrorCode(0);
  };

  useEffect(() => {
    getAllCoffe();
  }, []);

  const componentLine = (d, index) => {
    return (
      <tr
        key={index}
        onClick={() =>
          Router.push({
            pathname: "coffees/[id]",
            query: { id: d?._id },
          })
        }
      >
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-gray-900 whitespace-no-wrap">{d?.title}</p>
            </div>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{d?.sugar}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{d?.caffeine}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{d?.quantity}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{d?.creator}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {moment(d?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
          </p>
        </td>
      </tr>
    );
  };

  return (
    <Layout title="Home">
      <>
        <div className="bg-white p-8 w-full h-screen dark:bg-black">
          <div className=" flex items-center justify-between pb-6">
            <div>
              <h2 className="text-gray-600 font-semibold dark:text-white">
                Coffee Already Created
              </h2>
              <span className="text-xs">All products item</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="lg:ml-40 ml-10 space-x-8">
                <button
                  onClick={() => Router.push("/create-coffee")}
                  className="bg-black dark:bg-white px-4 py-2 rounded-md dark:text-black  text-white font-semibold tracking-wide cursor-pointer"
                >
                  Create
                </button>
              </div>
            </div>
          </div>

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal dark:bg-slate-600">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Coffee Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Sugar
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Caffeine
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Creator
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created at
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length !== 0 &&
                    data?.map((d, index) => componentLine(d, index))}
                </tbody>
              </table>
              {data?.length === 0 && (
                <div className="m-auto w-full flex justify-center align-center item-center py-2">
                  <p className="text-bold">No data to display</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Protected(CoffeeCommands);
