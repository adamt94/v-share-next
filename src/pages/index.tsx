import Head from 'next/head'
import { Inter } from 'next/font/google'
import Home from '../components/Home/Home'

const inter = Inter({ subsets: ['latin'] })

export default function HomPage() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="v-share - watch videos together with friends!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Home />
      </main>
    </>
  )
}
