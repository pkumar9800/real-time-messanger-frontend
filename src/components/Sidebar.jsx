import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } =
    useContext(ChatContext)

  const { logout, onlineUsers } = useContext(AuthContext)

  const [input, setInput] = useState(false)

  const navigate = useNavigate()

  const filteredUsers = input
    ? users.filter(user => user.fullName.toLowerCase().includes(input.toLowerCase()))
    : users

  useEffect(() => {
    getUsers()
  }, [onlineUsers])

  return (
    <div
      className={`bg-white h-full p-5 rounded-r-xl overflow-y-scroll text-gray-800 border-r border-gray-200 shadow-md ${
        selectedUser ? 'max-md:hidden' : ''
      }`}
    >
      {/* ------- Top Section ------- */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className="max-w-40" />
          <div className="relative py-2 group">
            <img src={assets.menu_icon} alt="Menu" className="max-h-5 cursor-pointer invert brightness-50" />
            <div className="absolute top-full right-0 z-20 w-32 p-4 rounded-md bg-white border border-gray-300 shadow-lg text-gray-700 hidden group-hover:block">
              <p
                onClick={() => navigate('/profile')}
                className="cursor-pointer text-sm hover:text-orange-500 transition"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-200" />
              <p
                onClick={() => logout()}
                className="cursor-pointer text-sm hover:text-orange-500 transition"
              >
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* ------- Search Bar ------- */}
        <div className="bg-gray-100 rounded-full flex items-center gap-2 py-2 px-4 mt-5 border border-gray-200">
          <img src={assets.search_icon} alt="Search" className="w-3 opacity-70 invert brightness-45" />
          <input
            onChange={e => setInput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-gray-700 text-sm placeholder-gray-400 flex-1"
            placeholder="Search User..."
          />
        </div>
      </div>

      {/* ------- User List ------- */}
      <div className="flex flex-col">
        {filteredUsers.map((user, index) => (
          <div
            onClick={() => {
              setSelectedUser(user)
              setUnseenMessages(prev => ({ ...prev, [user._id]: 0 }))
            }}
            key={index}
            className={`relative flex items-center gap-3 p-2 pl-4 rounded cursor-pointer transition ${
              selectedUser?._id === user._id ? 'bg-orange-50 border border-orange-200' : 'hover:bg-gray-50'
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt=""
              className="w-[38px] aspect-[1/1] rounded-full border border-gray-200"
            />
            <div className="flex flex-col leading-5">
              <p className="text-gray-700 font-medium">{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-green-500 text-xs">Online</span>
              ) : (
                <span className="text-gray-400 text-xs">Offline</span>
              )}
            </div>

            {unseenMessages[user._id] > 0 && (
              <p className="absolute top-3 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-orange-500 text-white font-medium shadow-sm">
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
