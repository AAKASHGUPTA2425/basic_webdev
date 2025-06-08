import React , { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css' 
import {login,logout} from './store/authSlice'
import authservice from './appwrite/auth'
import { Footer, Header } from './Components'
import { Outlet } from 'react-router-dom'
function App() {
  const [loading,setLoading]=useState(true)
const dispatch=useDispatch()

useEffect(()=>{authservice.getCurrentuser()
  .then((userdata)=>{
    if(userdata){
      dispatch(login({userdata}))
    } 
    else{
           dispatch(logout())
    }
  })
  .finally(()=>setLoading(false))
},[])
  
  
return !loading ? (<div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
  <div className='w-full block'>
    <Header/>
    <main>
     <Outlet/>
      </main> 
      <Footer/>
       </div>
</div>): null
}

export default App
