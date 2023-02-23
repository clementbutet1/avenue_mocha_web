import { useState, useEffect } from "react";
import Layout from "../src/components/Layout";
import { useAuth } from "../src/context/AuthContext";
import Router from "next/router";

const Home = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const coffeeOrders = [
    {
      name: "Coffee Long",
      description: "Long espresso coffee with hot water",
      image: "/assets/coffee_long.jpeg",
    },
    {
      name: "Café latte",
      description: "Espresso coffee with hot milk and milk foam",
      image: "/assets/latte.jpg",
    },
    {
      name: "Cappuccino",
      description: "Espresso coffee with hot milk and milk foam",
      image: "/assets/cappucino.jpg",
    },
    {
      name: "Espresso",
      description: "A simple espresso",
      image: "/assets/expresso.jpg",
    },
    {
      name: "Mocha",
      description: "Espresso coffee with hot chocolate and milk",
      image: "/assets/mocha.jpg",
    },
  ];

  const CommandCoffee = (title) => {
    if (isAuthenticated)
      Router.push({
        pathname: "/create-coffee",
        query: { titlecoffee: title },
      });
    else {
      Router.push("/login")
    };
  };

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
                <img
                  src={order.image}
                  className="w-full max-h-32 object-fill"
                />
                <h3 className="font-bold text-xl mb-2">{order.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-base">
                  {order.description}
                </p>
                <button
                  onClick={() => CommandCoffee(order.name)}
                  className="hover:text-black hover:bg-white bg-black dark:bg-white text-white dark:text-black dark:hover:bg-black dark:hover:text-white font-bold py-2 px-4 rounded mt-4"
                >
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
