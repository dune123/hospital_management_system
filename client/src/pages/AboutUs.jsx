import React from 'react'
import Hero from "../components/Hero"
import BioGraphy from "../components/BioGraphy"

const AboutUs = () => {
  return (
    <div>
      <Hero title={"Learn More About Us | ZeeCare Medical Institute"} imageUrl={"/about.png"}/>
      <BioGraphy imageUrl={"/whoweare.png"}/>
    </div>
  )
}

export default AboutUs