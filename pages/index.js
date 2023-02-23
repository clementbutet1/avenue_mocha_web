import { useState, useEffect } from "react";
import Layout from "../src/components/Layout";

const Home = () => {
  const coffeeOrders = [
    {
      name: "Coffee Long",
      description: "Long espresso coffee with hot water",
    },
    {
      name: "Café latte",
      description: "Espresso coffee with hot milk and milk foam",
    },
    {
      name: "Cappuccino",
      description: "Espresso coffee with hot milk and milk foam",
    },
    {
      name: "Espresso",
      description: "A simple espresso",
    },
    {
      name: "Mocha",
      description: "Espresso coffee with hot chocolate and milk",
    },
  ];

  return (
    <Layout title="Home">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">Welcome to Avenue Mocha !</h1>

          <p className="mt-3 text-xl">
          Here are some of our popular coffee orders :
          </p>

          <div className="flex flex-wrap items-center justify-center  mt-6 sm:w-full">
            {coffeeOrders.map((order) => (
              <div
                key={order.name}
                className="bg-white dark:bg-black dark:border-white dark:border-2 p-6 rounded-lg shadow-lg m-4 w-80"
              >
                <h3 className="font-bold text-xl mb-2">{order.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-base">{order.description}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                  Commander
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
