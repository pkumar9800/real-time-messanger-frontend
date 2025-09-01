import React, { useContext, useEffect, useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext)
  const { logout, onlineUsers } = useContext(AuthContext)
  const [msgImages, setMsgImages] = useState([])

  // Get all the images from the messages and set them to state
  useEffect(() => {
    setMsgImages(messages.filter(msg => msg.image).map(msg => msg.image))
  }, [messages])

  return (
    selectedUser && (
      <div
        className={`bg-white text-gray-800 w-full relative overflow-y-scroll border-l border-gray-200 shadow-md ${
          selectedUser ? 'max-md:hidden' : ''
        }`}
      >
        {/* Profile Section */}
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt=""
            className="w-20 aspect-[1/1] rounded-full border-2 border-orange-400 shadow-sm"
          />
          <h1 className="px-10 text-xl font-semibold mx-auto flex items-center gap-2 text-gray-700">
            {onlineUsers.includes(selectedUser._id) && (
              <p className="w-2 h-2 rounded-full bg-green-500"></p>
            )}
            {selectedUser.fullName}
          </h1>
          <p className="px-10 mx-auto text-gray-500">{selectedUser.bio}</p>
        </div>

        <hr className="border-gray-200 my-4" />

        {/* Media Section */}
        <div className="px-5 text-sm">
          <p className="font-medium text-gray-500">Media</p>
          <div className="mt-3 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-3">
            {msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded-lg border border-gray-200 hover:shadow-md transition"
              >
                <img
                  src={url}
                  alt=""
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => logout()}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-12 rounded-full shadow-md transition"
        >
          Logout
        </button>
      </div>
    )
  )
}

export default RightSidebar
