import React from 'react'
import Hero from '../components/Layout/User-components/Hero'
import Collection from '../components/Products/Collection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSelection from '../components/Products/FeaturesSelection'

const Home = () => {

const placeholderProducts = [
  {
    _id: "1",
    name: "Modern Art Canvas",
    price: 1200,
    images: [
      { url: "https://picsum.photos/400/500?random=21",
        alt: "Modern Art 1" },
      
    ],

  },
  {
    _id: "2",
    name: "Modern Art Canvas",
    price: 1200,
    images: [
      { url: "https://picsum.photos/400/500?random=22",
        alt: "Modern Art 1" },
      
    ],
    
  },
  {
    _id: "3",
    name: "Modern Art Canvas",
    price: 1200,
    images: [
      { url: "https://picsum.photos/400/500?random=23",
        alt: "Modern Art 1" },
      
    ],
    
  },
  {
    _id: "4",
    name: "Modern Art Canvas",
    price: 1200,
    images: [
      { url: "https://picsum.photos/400/500?random=24",
        alt: "Modern Art 1" },
      
    ],
    
  },
]



  return (
    <div>
        <Hero/>
        <Collection/>
        <NewArrivals/>
        {/* Best sellers */}
        <h2 className='text-3xl text-center font-bold mb-4 mt-5'>
          Best Seller
        </h2>
        <ProductDetails/>
        <div className='container mx-auto px-4 mb-10 mt-10'>
          <h2 className='text-3xl text-center font-bold mb-4'>
            Gallery
          </h2>
          <ProductGrid products={placeholderProducts}/>
        </div>
        <FeaturedCollection/>
        <FeaturesSelection/>
    </div>
  )
}

export default Home