import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Axios from 'axios'

import { AuthProvider } from '../context/auth'

import NavBar from '../components/NavBar'

Axios.defaults.baseURL = 'http://localhost:5000/api'
Axios.defaults.withCredentials = true

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const authRoutes = ['/register', '/login']
  const authRoute = authRoutes.includes(pathname)
  return (
    <AuthProvider>
      {!authRoute && <NavBar />}
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
