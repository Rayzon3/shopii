import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-midNight">
      <Head>
        <title>[Site Name]</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
