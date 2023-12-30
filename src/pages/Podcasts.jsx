import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Input from "../components/Input"
import { QuerySnapshot, collection, doc, onSnapshot, query } from 'firebase/firestore'
import { db } from '../firebase'
import { setPodcasts } from '../slices/podcastSlice'
import { useDispatch, useSelector } from 'react-redux'
import PodcastCard from '../components/Podcasts/PodcastCard'

function Podcasts() {
    const dispatch = useDispatch();
    const podcasts = useSelector((state)=>state.podcasts.podcasts)

    const[search,setSearch] = useState("")

    useEffect(()=>{
        const unsubscribe =onSnapshot(
            query(collection(db,"podcasts")),
            (QuerySnapshot) =>{
                const podcastData = [];
                QuerySnapshot.forEach((doc)=>{
                    podcastData.push({ id: doc.id, ...doc.data()})
                });
                dispatch(setPodcasts(podcastData));
            },
            (error) =>{
                console.error("Error fetching podcasts:",error)
            }
        );

        return () =>{
            unsubscribe();
        }
    },[dispatch])

    console.log(podcasts);

    var filterdPodcasts = podcasts.filter((item)=>{
        return item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    })

  return (
    <div>
        <Header />
        <div style={{margin:"1.5rem",textAlign:"center"}}>
            <h1>Discover Podcasts</h1>
            <Input state={search} 
                setState={setSearch} 
                placeholder="Search By Title" 
                type="text" 
            />
            {filterdPodcasts.length > 0 ? (
                <div className='podcasts-flex'style={{marginTop:"2rem"}} >
                {filterdPodcasts.map((item)=>{
                    return (
                    <PodcastCard 
                        key={item.id}
                        id={item.id} 
                        title={item.title} 
                        displayImage={item.displayImage} 
                    />
                    );
                })}
                </div>
            ):(
                <p>{search ? "Podcast not found":"No podcasts on the platform"}</p>
            )
            }
        </div>
    </div>
  )
}

export default Podcasts