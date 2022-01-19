import Head from 'next/head'
import { useSelector } from 'react-redux'
import NavBar from '../components/navBar.jsx'
import Main from '../components/Home.jsx'

export default function Home() {

  
  return (
    <div >
      <Head>
        <title>[Site Name]</title>
        <link rel="icon" href="/tree.ico" />
      </Head>
  
     <Main/>

    </div>
  )
}
