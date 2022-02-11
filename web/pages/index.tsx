import Head from 'next/head'
import styles from './index.module.css'


export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-dark bg-[url('/welcome.svg')] bg-[length:600px_600px] bg-fixed bg-left-bottom bg-no-repeat">
      <Head>
        <title>[Site Name]</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&family=Ubuntu+Mono&display=swap');
        </style>
      </Head>
        <h1 className={styles.title}>E-Fritter</h1>
        <section className={styles.flexContainer}>
        <div className={styles.flexItem}>
          {/* <Link to="/buy"> */}
            <h1>BUY</h1>
          {/* </Link> */}
        </div>
        <div className={styles.flexItem}>
          {/* <Link to="/sell"> */}
            <h1>SELL</h1>
          {/* </Link> */}
        </div>
        <div className={styles.flexItem}>
          {/* <Link to="/recycle"> */}
            <h1>RECYCLE</h1>
          {/* </Link> */}
        </div>
      </section>
    </div>
  )
}
