
import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Footer from './Footer'
import "./styles.css" 

const Home = () => {
    return (
        <div>
           <Navbar/>
           <Hero/>
           <Footer/>
        </div>
      )
}

export default Home