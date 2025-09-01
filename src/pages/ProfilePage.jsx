import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext)

  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate()
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedImg) {
      await updateProfile({ fullName: name, bio })
      navigate('/')
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(selectedImg)
    reader.onload = async () => {
      const base64Image = reader.result
      await updateProfile({ profilePic: base64Image, fullName: name, bio })
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-5/6 max-w-2xl bg-white text-gray-800 border border-gray-300 shadow-xl flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        {/* -------- form -------- */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-lg font-semibold text-gray-900">
            Profile details
          </h3>

          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-orange-500"
          >
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : assets.avatar_icon
              }
              alt=""
              className={`w-12 h-12 object-cover ${
                selectedImg && 'rounded-full'
              }`}
            />
            Upload profile image
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your name"
            className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            required
            className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={4}
          ></textarea>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full text-lg cursor-pointer transition-colors"
          >
            Save
          </button>
        </form>

        {/* -------- profile image preview -------- */}
        <img
          className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 object-cover ${
            selectedImg && 'rounded-full'
          }`}
          src={authUser?.profilePic || assets.logo_icon}
          alt=""
        />
      </div>
    </div>
  )
}

export default ProfilePage
