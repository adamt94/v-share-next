import Head from 'next/head'
import { Inter } from 'next/font/google'
import Room from '@/components/Room/Room'
import VideoPlayer from '@/components/VideoPlayer/ReactPlayerWrapper'
import { useRouter } from 'next/dist/client/router'

export const VideoPlayerWrapper = VideoPlayer

export default function Lobby() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>v-share</title>
        <meta
          name="description"
          content="v-share - you've been invited to join a lobby!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Room roomId={router.query.room} />
      </main>
    </>
  )
}
