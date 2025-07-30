import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis';

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

import Home from './pages/Home'
import Shop from './pages/Shop'
import Policy from './pages/Policy'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails';



function App() {
  
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);


  

  return (
    <>
      {/* Custom Cursor */}
      {/* <CustomCursor /> */}

      <div className='App relative min-h-screen bg-white w-full mx-auto'>
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/shop/:id" element={<ProductDetails/>} />
        </Routes>

        <Footer />
      </div>
    </>
  )
}

export default App;
