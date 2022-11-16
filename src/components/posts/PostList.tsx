import { postUrl } from '@urls/apis.url'
import { fetcher } from '@utils/fetch.utils'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import Post from './Post'

/**
 * Home: The Landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home Page
 */

interface Post {
  id: number
  title: string
  body: string
}

const PostList = () => {
  const [page, setPage] = useState(1)

  const { data, error } = useSWR(`${postUrl}?_page=${page}&limit=10`, fetcher)

  useEffect(() => {
    console.log('[INFO] data changed')
  }, [data])

  if (error) return <p className="text-red-400">Error occured</p>
  if (!data) return <p className="text-blue-400">Loading</p>

  return (
    <div className="bg-slate-200 p-4">
      <div className="flex gap-4 justify-center items-center m-4">
        <button onClick={() => setPage(page - 1)}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>

      <div>
        {data?.map((p: Post) => (
          <Post key={p.id} id={p.id} title={p.title} body={p.body} />
        ))}
      </div>
    </div>
  )
}

export default PostList
