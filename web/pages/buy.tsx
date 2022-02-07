import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
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
    e.preventDefault();
    const filteredProducts = product.filter(prods=>{
        return prods.title.toLowerCase().includes(search)
    })
    setProduct(filteredProducts)
    console.log(search)
    console.log(filteredProducts);


  }


  return (
    <div className=" min-h-screen  bg-dark  bg-fixed  py-2">
      <div className="flex">
        <div className=" mx-auto mt-4  ">
          <input placeholder='Find your product here' className="w-96 py-2 px-4 outline-none " value={search} onChange={(e)=>setSearch(e.target.value)}></input>
          <button onClick={handleSearch} className="border border-black  bg-green py-2 px-4 ">
            Search
          </button>
        </div>
      </div>
      <h1 className='text-center text-white font-semibold text-4xl mt-8'> Our Products </h1>
      <div className="mt-8 grid grid-cols-4 gap-4 mx-12">
      {product.map((prod) => (
                <div className="rounded overflow-hidden shadow-lg bg-white p-4">
                    <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
                      <img
                        src={prod.image}
                        alt="product image"
                        className="object-cover object-center w-full h-full group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-4 text-xl text-bold  text-gray-700">
                      {prod.title}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      Price: {prod.price}
                    </p>
                </div>
            ))}
      </div>
    </div>
  )
}

export default buy
