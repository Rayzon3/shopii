import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import image from '../../public/images/9btx63btWcuNzYE.png'

const buy = () => {
  const [product, setProduct] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products/')
      .then((res) => {
        const product = res.data
        setProduct(product)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data)
        } // => the response payload
      })
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const filteredProducts = product.filter((prods) => {
      return prods.title.toLowerCase().includes(search)
    })
    setProduct(filteredProducts)
    console.log(search)
    console.log(filteredProducts)
  }

  return (
    <div className=" min-h-screen  bg-dark  bg-fixed  py-2">
      <div className="flex">
        <div className=" mx-auto mt-4  ">
          <input
            placeholder="Find your product here"
            className="w-96 py-2 px-4 outline-none "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button
            onClick={handleSearch}
            className="border border-black  bg-green py-2 px-4 "
          >
            Search
          </button>
        </div>
      </div>
      <h1 className="mt-8 text-center text-4xl font-semibold text-white">
        {' '}
        Our Products{' '}
      </h1>
      <div className="mx-12 mt-8 grid grid-cols-4 gap-4">
        {product.map((prod) => (
          <div className="overflow-hidden rounded bg-white p-4 shadow-lg">
            <div className="bg-gray-200 aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 relative w-full overflow-hidden rounded-lg">
              <Image
                src={`/${prod.imageUrn}`}
                alt="product image"
                className="h-full w-full object-cover object-center group-hover:opacity-75"
                height={500}
                width={500}
              />
            </div>
            <h3 className="text-bold text-gray-700 mt-4  text-xl">
              {prod.title}
            </h3>
            <p className="text-gray-900 mt-1 text-lg font-medium">
              Price: {prod.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default buy
