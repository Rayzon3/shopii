import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Link from 'next/link'
import Head from "next/head";
import Modal from "../components/modal.jsx";
import NavBar from "../components/navBar.jsx";
import axios from "axios";
import next from "next";


export default function Home() {
  let [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect (()=>{
    axios.get('http://127.0.0.1:8000/product/product/')
    .then(res=>{
      const product = res.data;
      setProduct(product);
    })
    .catch((error) => {
      if( error.response ){
        console.log(error.response.data);
       } // => the response payload
    })
  },[]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="flex flex-col min-h-screen py-2 bg-midNight">
      <Head>
        <title>[Site Name]</title>
        <link rel="icon" href="/tree.ico" />
      </Head>
      <NavBar />
      <main className="flex flex-col flex-1 w-full px-10 text-midNight">
        <div className="max-w-2xl px-4 py-16 mx-auto text-center sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {product.map((prod) => (
              <Link href={{
                pathname : "/buy/info",
                query : { id : prod.id}
              }}>
              <div className="rounded overflow-hidden shadow-lg bg-white p-4">
                <a key={prod.id} className="group">
                  <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={prod.image}
                      alt="product image"
                      className="object-cover object-center w-full h-full group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-xl text-bold  text-gray-700">
                    {prod.name}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    Price: {prod.price}
                  </p>
                </a>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 hidden w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-10 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Confirm Your Purchase!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Do you want to buy this item.
                  </p>
                </div>

                <div className="mt-2 space-x-20 align-center">
                  <button
                    type="button"
                    className="px-4 py-2 mt-4 text-white rounded-full bg-red"
                    onClick={closeModal}
                  >
                    Nah, Go Back
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 mt-4 rounded-full text-midNight bg-green"
                    onClick={closeModal}
                  >
                    Yes, Buy Now!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
