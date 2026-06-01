import React from 'react'
import HeroPast from '../component/PastQuestions/HeroPast'
import MainPast from '../component/PastQuestions/MainPast'
import NavBar from '../component/IntroNav/NavBar'
import IntroFooter from '../component/IntroFooter/IntroFooter'

const PastQuestions = () => {
  return (
    <div>
      <NavBar />
        <HeroPast />
        <MainPast />
        <IntroFooter />
    </div>
  )
}

export default PastQuestions