import React from 'react'
import Header from '../components/Header'
import "../pages/style.css"
import CreateApodcastForm from '../components/StartAPodcast/CreateApodcastForm'
import podcastImg from "../images/img.jpeg"

function CreateApodcast() {
  return (
    <div>
        <Header/>
        <div className='auth-container'>
            <img src={podcastImg} alt='image'/>
            <CreateApodcastForm/>
        </div>
        
        
    </div>
  )
}

export default CreateApodcast