import React from 'react'
import { useSelector} from "react-redux";
import Header from '../components/Header';
import Button from '../components/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import podcastImg from "../images/img.jpeg"

function Profile() {
    const user = useSelector((state)=>state.user.user);
    console.log("My user",user);
    if(!user){
      return <p>Loading...</p>
    }

    function handleLogout(){
      signOut(auth).then(()=>{
        toast.success("Logout successfully");
      }).catch((error)=>{
        toast.error(e.message)
      });
    };

  return (
    <div>
        <Header />
        <div className='auth-container'>
        <img src={podcastImg} alt='image'/>
        <div className='input-wrapper'>
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <Button text={"Logout"} onClick={handleLogout} />
        </div>
        </div>
    </div>
  )
}

export default Profile