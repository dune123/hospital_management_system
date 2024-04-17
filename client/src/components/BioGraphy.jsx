import React from 'react'

const BioGraphy = ({imageUrl}) => {
  return (
    <div className='conttainer biography'>
      <div className='banner'>
        <img src={imageUrl} alt='"aboutImg'/>
      </div>
      <div className='banner'>
        <p>Biogrpahy</p>
        <h3>Who We Are</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, totam assumenda placeat quibusdam recusandae quae, alias praesentium, dicta veritatis velit aspernatur a modi consequatur officia eius magnam esse. Vel, harum!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis sunt obcaecati minima. Consequatur magnam veritatis ipsam dolorem totam facere et. Eum debitis ab sunt dicta fugiat doloremque facilis quo non?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum delectus adipisci illo aliquid, officia debitis. Beatae, est ipsum aperiam tenetur sequi iste! Consequuntur quae excepturi sed explicabo reiciendis error eligendi?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non consequatur.</p>
      </div>
    </div>
  )
}

export default BioGraphy