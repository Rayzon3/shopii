import Axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import InputGroup from '../components/InputGroup'
import { useRouter } from 'next/router'
import { useAuthState } from '../context/auth'

export default function registerPage() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<any>({})

  const { authenticated } = useAuthState()

  const router = useRouter()
  if (authenticated) router.push('/')

  const submitForm = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const res = await Axios.post('/auth/register', {
        email,
        username,
        password,
      })
      router.push('/login')
      //   console.log(res.data)
    } catch (err) {
      //   console.log(err)
      setErrors(err.response.data)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-midNight py-2">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mt-3 text-4xl font-bold text-green">Register</h1>
      <form onSubmit={submitForm}>
        <div className="mt-8 items-center justify-center">
          <InputGroup
            className="m-2"
            type="email"
            value={email}
            setValue={setEmail}
            placeholder="Email"
            errors={errors.email}
          />
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
        <small className="text-green">
          <Link href="/login">
            <a className="ml-1 mt-1"> Already a user? Login!</a>
          </Link>
        </small>
        <button className="mt-4 mb-4 w-full rounded-full bg-green py-2 text-sm font-bold text-midNight">
          Register!
        </button>
      </form>
    </div>
  )
}
