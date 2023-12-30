import React from 'react'
import Button from '../Button'
import "./style.css"

function EpisodeDetails({index,title,description,audioFile,onClick}) {
  return (
    <div>
        <h3 style={{textAlign:"left", marginLeft:"60px"}}>{index}. {title}</h3>
        <p style={{marginLeft:"5rem"}}>{description}</p>
        <p style={{textAlign:"left", marginLeft:"60px"}}>
          <Button 
          style={{width:"15vw !important" , marginLeft:"60px"}}
          text={"Play"}
          onClick={()=>onClick(audioFile)}
          />
         </p>
    </div>
  )
}

export default EpisodeDetails