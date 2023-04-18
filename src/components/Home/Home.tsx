import React from 'react'
import { Button } from '@mui/material'

//icons
import GroupIcon from '@mui/icons-material/Group'
import SyncIcon from '@mui/icons-material/Sync'
import ChatIcon from '@mui/icons-material/Chat'
import Search from '../Search/Search'
import Link from 'next/link'
import { generateRandomString } from '@/util/numberFormats'

export default function App() {
  const roomId = generateRandomString(8)
  return (
    <>
      {/* {!!isALobby && userName && <Video numberOfUsers={numberOfUsers} />} */}
      {/* <input type="hidden" name="lobby" value={randomString(10)} /> */}
      <section className="text-center flex flex-col gap-8 p-5">
        <h1 className="display-medium on-background-text">
          Watch Videos Together
        </h1>
        <ul className="flex flex-col gap-6 items-center">
          <ul className="flex justify-center gap-6">
            <li>
              <GroupIcon fontSize="large" className="primary-text" />
              <p className="on-background-text">Watch Together</p>
            </li>
            <li>
              <SyncIcon fontSize="large" className="primary-text" />
              <p className="body-large on-background-text">Auto Sync</p>
            </li>
            <li>
              <ChatIcon fontSize="large" className="primary-text" />
              <p className="body-large on-background-text">Chat Together</p>
            </li>
          </ul>
          <div>
            <p className="headline-small on-background-text">
              To start click the button bellow and share the url with friends.
            </p>
          </div>
          <Link href={`/lobby?room=${roomId}`}>
            <Button
              variant="outlined"
              type="submit"
              className=" w-48 primary-text primary-border hover:primary-border"
            >
              Create New Room
            </Button>
          </Link>
        </ul>
      </section>

      <section className="p-0  py-5 sm:p-5">
        <Search />
      </section>
      {/* <SearchPanel /> */}
    </>
  )
}
