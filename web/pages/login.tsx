import Axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import InputGroup from '../components/InputGroup'
import { useRouter } from 'next/router'

import { useAuthDispatch, useAuthState } from '../context/auth'

export default function loginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<any>({})

  const dispatch = useAuthDispatch()
  const { authenticated } = useAuthState()

  const router = useRouter()
  if (authenticated) router.push('/')

  const submitForm = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const res = await Axios.post('/auth/login', {
        username,
        password,
      })

      dispatch('LOGIN', res.data)

      router.push('/')
      //   console.log(res.data)
    } catch (err) {
      //   console.log(err)
      setErrors(err.response.data)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark bg-[url('/authentication.svg')] bg-[length:600px_600px] bg-fixed bg-left-bottom bg-no-repeat py-2">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mt-3 text-4xl font-bold text-green">Login</h1>
      <form onSubmit={submitForm}>
        <div className="mt-8 items-center justify-center">
          <InputGroup
            className="m-2"
            type="username"
            value={username}
            setValue={setUsername}
            placeholder="Username"
            errors={errors.username}
          />
          <InputGroup
            className="m-2"
            type="password"
            value={password}
            setValue={setPassword}
            placeholder="Password"
            errors={errors.password}
          />
        </div>
        <small className="text-green hover:underline">
          <Link href="/register">
            <a className="ml-1 mt-1"> New user? Register!</a>
          </Link>
        </small>
        <button className="mt-4 mb-4 w-full rounded-full bg-green py-2 text-sm font-bold text-midNight hover:bg-greenDarker">
          Login!
        </button>
      </form>
    </div>
  )
}
