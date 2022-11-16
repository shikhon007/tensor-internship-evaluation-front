import React from 'react'

/**
 * Home: The Landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home Page
 */

interface PostProps {
  id: number
  title: string
  body: string
}

const Post = ({ id, title, body }: PostProps) => {
  return (
    <div className="border border-slate-400 p-4 m-4">
      <h1 className="text-3xl">{id + ' : ' + title}</h1>
      <p>{body}</p>
    </div>
  )
}

export default Post
