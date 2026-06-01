import React from 'react'
import FpasSidebar from '../component/FpasSidebar'
import AnnounceFpas from '../component/AnnounceFpas'

const AnnouncementFpas = () => {
  return (
<div className="min-h-screen bg-gray-100 w-full overflow-x-hidden">

      <FpasSidebar />

        <div className="ml-0 md:ml-64 transition-all duration-300 pt-14 md:pt-0">
        <AnnounceFpas />
      </div>
    </div>
  )
}

export default AnnouncementFpas