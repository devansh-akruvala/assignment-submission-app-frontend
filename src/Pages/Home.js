import React from 'react'
import { useLocalState } from '../util/useLocalStorage'

const Home = () => {
    const [jwt,setJwt] = useLocalState("","jwt")
    return (
    <div>Home
        JWT: {jwt}

    </div>
  )
}

export default Home