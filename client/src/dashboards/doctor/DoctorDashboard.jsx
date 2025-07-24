import React from 'react'
import { useSelector } from 'react-redux'

const DoctorDashboard = () => {
    const { doctorProfile } = useSelector(state=> state.doctorReducer);
    console.log(doctorProfile)

    
  return (
    <div>
      hey
    </div>
  )
}

export default DoctorDashboard
