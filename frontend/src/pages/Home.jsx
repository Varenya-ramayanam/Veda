import React from 'react'
import Hero from '../components/Layout/User-components/Hero'
import Collection from '../components/Products/Collection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Collection/>
        <NewArrivals/>
        {/* Best sellers */}
        <h2 className='text-3xl text-center font-bold mb-4 mt-5'>
          Best Seller
          <ProductDetails/>
        </h2>
    </div>
  )
}

export default Home