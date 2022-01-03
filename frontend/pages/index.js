import Head from 'next/head'
import NavBar from '../components/navBar.jsx'

export default function Home() {

  
  return (
    <div className="flex flex-col min-h-screen py-2 bg-midNight">
      <Head>
        <title>[Site Name]</title>
        <link rel="icon" href="/tree.ico" />
      </Head>
      <NavBar />
      <main className="flex flex-col items-center justify-center flex-1 w-full px-10 text-center text-white">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-green" href="/">
            [Site Name]!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Your One Stop To
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <a
            href="/buy"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-green focus:text-green"
          >
            <h3 className="text-2xl font-bold">Buy &rarr;</h3>
            <p className="mt-4 text-xl">
              We got everthing you need!
            </p>
          </a>

          <a
            href="/sell"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-green focus:text-green"
          >
            <h3 className="text-2xl font-bold">Sell &rarr;</h3>
            <p className="mt-4 text-xl">
              Sell your stuff at great prices!
            </p>
          </a>

          <a
            href="#"
            className="p-6 mt-6 text-left transform border w-96 rounded-xl hover:text-green focus:text-green"
          >
            <h3 className="text-2xl font-bold">Recycle &rarr;</h3>
            <p className="mt-4 text-xl">
              Save the environment!
            </p>
          </a>
        </div>
      </main>
    </div>
  )
}
