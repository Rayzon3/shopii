import React from 'react'
import Head from "next/dist/shared/lib/head"
import { useState } from 'react'
import NavBar from '../components/navBar.jsx'
import axios from 'axios'
const sell = () => {

    const headers = {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json',
      'Accept' : 'application/json'
  }

  const [title, setTitle] = useState('');
  const [desc, setDesc]= useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      const token =localStorage.getItem('token');
      if(token){
          axios.post('http://localhost:5000/api/products/',
          {
              title: title,
              description : desc,
              price : price,
              headers : headers,
              
          }).then(res =>(console.log(res)))
          .catch((error) => {
              if( error.response ){
                  console.log(error.response.data); // => the response payload 
              }
          });
      }
      else{
          console.log('Unauthenticated');
      }
      

      setTitle('');
      setDesc('');
      setPrice('');

    
  }
  return (
    <div className="min-h-screen  mx-auto py-2 bg-midNight">
      <Head>
        <title>[Site Name]</title>
        <link rel="icon" href="/tree.ico" />
      </Head>
      <NavBar/>
      <div className="sm:w-1/2 mt-20 mb-20 mx-auto border p-6 rounded-xl border-green bg-white   ">
                <form onSubmit = {(e)=>handleSubmit(e)}>
                    <h1 className="text-midNight text-center text-4xl font-bold">Enlist your product!</h1>
                    <div className="flex flex-col p-3 mt-3">
                    <div className="mb-1">
                    <label for="title" className="text-midNight text-2xl" >Name:</label>
                    </div>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className=" w-full py-1  px-3 text-midNight border focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded" placeholder="Title of your product" id="title" name="title"></input>
                    </div>
                    <div className="p-3">
                    <div className="mb-1">
                    <label for="desc" className="text-midNight text-2xl" >Description:</label>
                    </div>
                    <textarea type="text" value={desc} id="description" onChange={(e)=>setDesc(e.target.value)} rows="4" className="w-full py-1 px-3 border focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded" id="desc" placeholder="Describe your product..." name="desc"></textarea>
                    </div>
                    <div className="p-3">
                    <div className="mb-1">
                    <label for="price" className="text-midNight text-2xl" >Price:</label>
                    </div>
                    <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} className="w-full py-1 px-3 border focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded" id="price" placeholder="Enter the price" name="price"></input>
                    </div>
                    
                    <div className="text-center m-2">
                        <button type="submit" className="bg-green hover:bg-green-500 text-midNight font-bold py-2 px-4 rounded">Proceed</button>
                    </div>
                    
                </form>
            </div>
        </div>
  
  )
}

export default sell
