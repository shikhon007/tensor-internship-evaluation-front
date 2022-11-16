import PostList from '@components/posts/PostList'
import type { NextPage } from 'next'
import React from 'react'

/**
 * Home: The Landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home Page
 */

const Index: NextPage = () => {
  return (
    <>
      <PostList />
    </>
  )
}

export default Index
