import React, { useState } from 'react'
import Header from '../components/Header'
import { useDispatch } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import Input from '../components/Input';
import FileInput from '../components/FileInput';
import Button from '../components/Button';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import podcastImg from "../images/img.jpeg"

function CreateAnEpisode() {
    const { id } = useParams();
    const[title,setTitle] = useState("");
    const[desc,setDesc] = useState("");
    const[audioFile,setAudioFile] = useState("");
    const[loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const audioFileHandle = (file)=>{
        setAudioFile(file)
    }

    const handleSubmit = async () =>{
        setLoading(true)
        if(title,desc,audioFile,id){
            try {
                const audioRef = ref(
                    storage,
                    `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
                );
                await uploadBytes(audioRef,audioFile);

                const audioURL = await getDownloadURL(audioRef);

                const episodeData = {
                    title: title,
                    description: desc,
                    audioFile: audioURL,
                };
                await addDoc(
                    collection(db,"podcasts",id,"episodes"),
                    episodeData
                );
                navigate(`/podcast/${id}`);
                setTitle("")
                setDesc("")
                setAudioFile(null)
                toast.success("Episode created successfully")
            } 
            catch (e) {
                toast.error(e.message)
                setLoading(false)
            }
        }
        else{
            toast.error("All fields are reuired")
            setLoading(false)
        }
    }

  return (
    <div>
        <Header/>
        <div className='auth-container'>
        <img src={podcastImg} alt='image'/>
        <div className='input-wrapper'>
            <h1>Create an Episode</h1>
            <Input 
                state={title} 
                setState={setTitle} 
                placeholder="Title" 
                type="text" 
                required={true}
        />
        <Input 
                state={desc} 
                setState={setDesc} 
                placeholder="Description" 
                type="text" 
                required={true}
        />
        <FileInput 
            accept={"audio/*"} 
            id="audio-file-input" 
            fileHandleFnc={audioFileHandle} 
            text={"Upload Audio File "}
        />
        <Button 
            text={loading ? "Loading..." :"Create Episode"} 
            disabled={loading} 
            onClick={handleSubmit} 
        />
            </div>
        </div>
    </div>
  )
}

export default CreateAnEpisode