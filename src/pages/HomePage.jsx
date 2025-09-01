import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {

    const {selectedUser} = useContext(ChatContext)

  return (
    <div className="bg-white w-full h-screen sm:px-[12%] sm:py-[4%]">
  <div
    className={`backdrop-blur-md border border-gray-300 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative shadow-lg 
      ${selectedUser 
        ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' 
        : 'md:grid-cols-2'
      }`}
  >
    <Sidebar />
    <ChatContainer />
    <RightSidebar />
  </div>
</div>

  )
}

export default HomePage
