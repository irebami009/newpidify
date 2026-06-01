import React from 'react'
import FsmsSidebar from '../component/FsmsSidebar'
import FsmsTimetable from '../component/FsmsTimetable'


const Timetables2 = () => {
  return (
     <div className="min-h-screen bg-gray-100 w-full overflow-x-hidden">

      <FsmsSidebar />

        <div className="ml-0 md:ml-64 transition-all duration-300 pt-14 md:pt-0">
        <FsmsTimetable />
      </div>
    </div>
  )
}

export default Timetables2