import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
function LogoutButton() {
    const Dispatch=useDispatch()
    const LogoutHandler=()=>{
        authservice.logout().then(()=>{
            Dispatch(logout())
        })
    }
    return (
        <button
        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={LogoutHandler}>Logout</button>
    )
}

export default LogoutButton
