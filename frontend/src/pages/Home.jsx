import React from 'react'
import Hero from '../components/Layout/User-components/Hero'
import Collection from '../components/Products/Collection'
import NewArrivals from '../components/Products/NewArrivals'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Collection/>
        <NewArrivals/>
    </div>
  )
}

export default Home