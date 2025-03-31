import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Navbar/Navbar'

const Dashboard = () => {
  return (
    <div>
    <Navbar/>
    <Outlet/>
    </div>
  )
}

export default Dashboard