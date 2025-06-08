import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editPost } from '../store/postSlice'
function PostCard({ $id, title, Featuredimage }) {
const  dispatch = useDispatch()
 const  navigate = useNavigate()
  const handleclickchange = () => {
    dispatch(editPost({
      Featuredimage: Featuredimage,
      title: title,
      slug: $id,
      content: "",
      status: "active"
    }))
    navigate("/add-post")
  }


return (
  <div className='w-full bg-gray-100 rounded-xl p-4'>
    <header className='ml-4'>
      <button
        className='rounded-b-2xl block bg-blue-200 px-4 py-2 hover:bg-blue-300'
        onClick={handleclickchange}
      >
        EDIT IT
      </button>
    </header>
    <div className='w-full justify-center mb-4'>
      {Featuredimage ? (
        <img
          src={appwriteService.getFilePreview(Featuredimage)}
          alt={title}
          className='rounded-xl'
        />
      ) : (
        <div className="bg-gray-300 rounded-xl h-40 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
    </div>
    <h2 className='text-xl font-bold'>{title}</h2>
  </div>
);
}

export default PostCard