import React, { useState, useEffect } from 'react'

import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchTerm) {
      setLoading(true)
      const query = searchQuery(searchTerm.toLowerCase())
      client.fetch(query)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
    }
  }, [searchTerm])

  if (loading) return <Spinner message="Searching for pins..." />

  if (!pins?.length && searchTerm !== '' && !loading) return <div className="mt-10 text-center text-xl">No pins found!</div>

  return (
    <>
      <MasonryLayout pins={pins} />
    </>
  )
}

export default Search
