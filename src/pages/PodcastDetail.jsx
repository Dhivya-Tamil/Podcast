import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Button from "../components/Button"
import { useNavigate, useParams } from 'react-router-dom'
import { QuerySnapshot, collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import EpisodeDetails from '../components/EpisodeDetails';
import AudioPlayer from '../components/AudioPlayer';

function PodcastDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const[podcast,setPodcast] = useState({})
    const[episodes,setEpisodes] = useState([]);
    const[playingFile,setPlayingFile] = useState("")
    console.log('Id',id)

    useEffect(()=>{
        if(id){
         getData()
        }
    },[id])

    const getData = async ()=>{
        try {
        const docRef = doc(db,"podcasts",id);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document data:",docSnap.data());
            setPodcast({ id: id, ...docSnap.data()})
        }
        else{
            console.log("No such Podcast!")
            toast.error("No such Podcast")
            navigate("/podcasts")
        }
        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(()=>{
        const unsubscribe = onSnapshot(
            query(collection(db,"podcasts",id,"episodes")),
            (QuerySnapshot) =>{
                const episodeData = [];
                QuerySnapshot.forEach((doc)=>{
                    episodeData.push({ id: doc.id, ...doc.data()})
                });
                setEpisodes(episodeData)
            },
            (error) =>{
                console.error("Error fetching episodes: ",error)
            }
        );
        return () =>{
            unsubscribe();
        }
    },[id])

  return (
    <div>
        <Header/>
        <div>
        {podcast.id && (
            <>
            <div style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>
                <h1 className='podcast-title-heading'>{podcast.title}</h1>
                {podcast.createdBy == auth.currentUser.uid && (
                    <Button 
                    text={"Create Episode"}
                    onClick={()=>{
                       navigate(`/podcast/${id}/create-episode`)
                    }}
                    />
                )}    
            </div>
            <div className='banner-wrapper'>
                <img src={podcast.bannerImage} />
            </div>
                <p className='podcast-description'>{podcast.description}</p>
                <h1 className='podcast-title-heading'>Episodes</h1>
                {episodes.length > 0 ? 
                <ol> {episodes.map((episode,index)=>{
                    return <EpisodeDetails 
                    key={index}
                    index={index+1}
                    title={episode.title} 
                    description={episode.description} 
                    audioFile={episode.audioFile} 
                    onClick={(file )=>{setPlayingFile(file)}}
                    />
                })}</ol> 
                :
                <p style={{textAlign:"center"}}>No episode</p> 
                }
            </>
        )}
        </div>
        {playingFile && <AudioPlayer audioSrc={playingFile} image={podcast.displayImage}/>}
        
    </div>
  )
}

export default PodcastDetail