import React from 'react'
import Leftside from './Leftside'
import { Outlet } from 'react-router-dom'

function Appadmin() {
  return (
    <>
      <div className="container">
        <div className="row gap-2">
          <div className="col-3">
            <Leftside />
          </div>
          <div className="col-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Appadmin
