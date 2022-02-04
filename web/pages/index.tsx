import Head from 'next/head'

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
    </div>
  )
}
