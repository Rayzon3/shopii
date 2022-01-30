import React from "react";
import Head from "next/dist/shared/lib/head";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/navBar";
import { useSelector } from "react-redux";

const cart = () => {
  const [items, setItems] = useState([]);
  const cart = useSelector((state) => state.cart);
  let price = 0;

  return (
    <div className="flex flex-col min-h-screen py-2 bg-midNight">
      <Head>
        <title>[Site Name]</title>
        <link rel="icon" href="/tree.ico" />
      </Head>
      <NavBar />
      <div className="flex flex-col items-center">
        <div class="max-w-full my-20 overflow-hidden shadow-lg bg-white rounded-lg flex-wrap p-4">
          <div class="mt-2 px-2">
            <h1 class="flex items-center justify-center font-bold text-midNight text-md lg:text-3xl">
              Cart
            </h1>
          </div>
          <div class="container p-12 mx-auto text-midNight">
            <div class="flex flex-col w-full px-0 mx-auto md:flex-row">
              <div class="flex flex-col md:w-full">
                <h2 class="mb-4 font-bold md:text-xl text-heading ">
                  Items In Your Cart
                </h2>
                {cart.products.map((item) => {
                  price = price + item.price;
                  console.log(price);
                  return (
                    <div className="bg-white border rounded-xl m-4 p-4  ">
                      <h1 className="text-midNight text-2xl my-3">
                        {item.name}
                      </h1>
                      <p className="text-midNight text-xl my-2">
                        Price: {item.price}
                      </p>
                      <button class="font-medium py-2 px-4 bg-redAccent transform rounded-full motion-safe:hover:scale-110 ...">Proceed</button>
                    </div>
                  );
                })}
                <div class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Subtotal<span class="ml-2">{ price }</span>
                </div>
                <div class="mt-6">
                  <button class="font-medium w-full px-6 py-2 bg-green transform rounded-full motion-safe:hover:scale-110 ...">
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cart;
