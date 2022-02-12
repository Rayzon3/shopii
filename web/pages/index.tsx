import Head from 'next/head'
import NavBar from '../components/NavBar'
import styles from './index.module.css'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-dark bg-[url('/welcome.svg')] bg-[length:400px_600px] bg-fixed bg-left-bottom bg-no-repeat py-2">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
      </style>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-10 text-center text-white">
        <h1 className="text-6xl font-bold">
          Welcome
          <a href="/"> to</a>
          <a className="font-pacifico text-green hover:underline"> E-Fritter</a>
        </h1>

        <p className="mt-3 font-noto text-2xl">Your One Stop To</p>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <a
            href="/buy"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-green focus:text-green"
          >
            <h3 className="text-2xl font-bold">Buy &rarr;</h3>
            <p className="mt-4 text-xl">We got everthing you need!</p>
          </a>

          <a
            href="/sell"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-green focus:text-green"
          >
            <h3 className="text-2xl font-bold">Sell &rarr;</h3>
            <p className="mt-4 text-xl">Sell your stuff at great prices!</p>
          </a>

          <a
            href="#"
            className="mt-6 w-96 transform rounded-xl border p-6 text-left hover:text-green focus:text-green"
          >
            <h3 className="text-2xl font-bold">Recycle &rarr;</h3>
            <p className="mt-4 text-xl">Save the environment!</p>
          </a>
        </div>
      </main>
    </div>
  )
}
