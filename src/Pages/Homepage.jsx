import React from 'react'
import HeroSection from '../component/Home/HeroSection'
import MainSection from '../component/Home/MainSection'
import NavBar from '../component/IntroNav/NavBar'
import IntroFooter from '../component/IntroFooter/IntroFooter'


const Homepage = () => {
  return (
    <div>
      <NavBar />
     <HeroSection/>
     <MainSection />
     <IntroFooter />
    </div>
  )
}

export default Homepage