import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import Input from "../Input";
import Button from "../Button"
import { setUser } from '../../slices/userSlice';
import { toast } from 'react-toastify';
import FileInput from '../FileInput';
import { auth, db, storage} from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { addDoc, collection, doc, endAt, setDoc } from 'firebase/firestore';


function CreateApodcastForm() {
  const[title,setTitle] = useState("");
  const[desc,setDesc] = useState("");
  const[displayImage,setDisplayImage] = useState();
  const[bannerImage,setBannerImage] = useState();
  
  const[loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleSubmit = async ()=>{
    toast.success("Hanlding podcast")
    if(title && desc && displayImage && bannerImage){
      setLoading(true)
     try {
       //Upload files -> get downloadable links
       const bannerImageRef = ref(
        storage,
        `podcasts/${auth.currentUser.uid}/${Date.now()}`
      );
      const upload = await uploadBytes(bannerImageRef, bannerImage)
      console.log(upload)
      // toast.success("File Uploaded")

      const bannerImageURL =  await getDownloadURL(bannerImageRef)
      console.log("Banner",bannerImageURL)

        //displayImage
        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        const displayUpload = await uploadBytes(displayImageRef, bannerImage)
        console.log(displayUpload)
        // toast.success("File Uploaded")
  
        const displayImageURL =  await getDownloadURL(displayImageRef)
        console.log("Banner",bannerImageURL)

      const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageURL,
          displayImage: displayImageURL,
          createdBy: auth.currentUser.uid,
      };
      const docRef = await addDoc(collection(db,"podcasts"),podcastData);

      toast.success("Podcast Created");
      setLoading(false)
     }
    catch (error) {
      toast.error(e.message)
      console.log(e)
      setLoading(false)
     }
    }
    else{
      toast.error("Please fill all fields")
      setLoading(false)
    }
  }

  function displayImageHandle(file){
    setDisplayImage(file)
  }

  function bannerImageHandle(file){
    setBannerImage(file)
  }

  return (
    <div className=' input-wrapper'>
      <h3>Let's create a Podcast...</h3>
        <Input state={title} 
            setState={setTitle} 
            placeholder="Title" 
            type="text" 
            required={true}
        />
        <Input state={desc} 
            setState={setDesc} 
            placeholder="Description"
            type="text" 
            required={true}
         />
        <FileInput 
            accept={"image/*"} 
            id="display-image-input" 
            fileHandleFnc={displayImageHandle} 
            text={"Upload Display Image "}
        />

        <FileInput 
            accept={"image/*"} 
            id="banner-image-input" 
            fileHandleFnc={bannerImageHandle} 
            text={"Upload Banner Image"}
        />

        <Button 
            text={loading ? "Loading..." :"Create Podcast"} 
            disabled={loading} 
            onClick={handleSubmit} 
        />
    </div>
  )
}

export default CreateApodcastForm