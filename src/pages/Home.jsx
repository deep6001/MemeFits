import React from 'react'
import HeroSection from '../components/HeroSection'
import WhyUsSection from '../components/WhyUs'
import BestSeller from '../components/BestSeller'
import TestimonialSlider from '../components/Testimonial'
import { Helmet } from 'react-helmet'

function Home() {
  return (
    <>
    <Helmet>
      <title>MemeFits</title>
      <meta name="description" content="MemeFits - Trendy meme-themed t-shirts and apparel. Shop high-quality, stylish and affordable meme fashion online." />
    </Helmet>
    <div className='w-full sm:w-[90%] h-max bg-white mx-auto '>
      <HeroSection />
      <WhyUsSection/>
      <BestSeller/>
      <TestimonialSlider/>
    </div>
    </>
  )
}

export default Home
