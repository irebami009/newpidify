import React from 'react'
import HeroQuiz from '../component/Quiz/HeroQuiz'
import MainQuiz from '../component/Quiz/MainQuiz'
import NavBar from '../component/IntroNav/NavBar'
import IntroFooter from '../component/IntroFooter/IntroFooter'

const Quiz = () => {
  return (
    <div>
      <NavBar />
      <HeroQuiz />
      <MainQuiz />
      <IntroFooter />
    </div>
  )
}

export default Quiz