import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import InputGroup from '../components/InputGroup'
import { FormEvent, useState } from 'react'

export default function sellPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState<any>({})

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark py-2">
      <Head>
        <title>Sell</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mt-3 text-4xl font-bold text-green">Sell</h1>
      <form>
        <div className="mt-8 flex w-full flex-col items-center justify-center">
          <InputGroup
            className="m-2"
            type="title"
            value={title}
            setValue={setTitle}
            placeholder="Name Of Product"
            errors={errors.title}
          />
          <InputGroup
            className="m-2"
            type="description"
            value={description}
            setValue={setDescription}
            placeholder="Description Of Product"
            errors={errors.description}
          />
          <InputGroup
            className="m-2"
            type="price"
            value={price}
            setValue={setPrice}
            placeholder="Price Of Product"
            errors={errors.price}
          />
        </div>
        <button className="mt-4 mb-4 w-full rounded-full bg-green py-2 text-sm font-bold text-midNight hover:bg-greenDarker">
          Put on sale!
        </button>
      </form>
    </div>
  )
}
