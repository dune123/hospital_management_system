import React from 'react'
import ApointmentFrom from '../components/ApointmentFrom'
import Hero from '../components/Hero'

const Appointment = () => {
  return (
    <div>
      <Hero title={"Schedule Your Appointment | ZeeCare Medical Institute"} imageUrl={"/signin.png"}/>
      <ApointmentFrom/>
    </div>
  )
}

export default Appointment
