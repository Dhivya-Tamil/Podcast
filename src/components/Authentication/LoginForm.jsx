import React,{useState} from 'react'
import Input from "../Input"
import Button from "../Button"
import { auth, db, storage} from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import { setUser } from '../../slices/userSlice';
import { toast } from 'react-toastify';

function LoginForm() {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleLogin = async()=>{
    console.log("clicked")
    setLoading(true)
    if(email && password){
      try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        )
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db,"users",user.uid));
        const userData = userDoc.data();
        console.log("userData",userData)

        dispatch(
            setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
        })
        );
        toast.success("Login successfull");
        setLoading(false)
        navigate("/profile");

        
    } catch (e) {
      console.log("Error",e)
        setLoading(false)
        toast.error(e.message)
        
    }
  
    }
    else{
      toast.error("Please fill required fields")
    }
    
  }

  return (
    <div>
        <Input state={email} setState={setEmail} placeholder="Email" type="email" required={true}/>
        <Input state={password} setState={setPassword} placeholder="Password" type="password" required={true}/>
        <Button text={loading ? "Loading..." :"Login"} disabled={loading} onClick={handleLogin} />
    </div>
  )
}

export default LoginForm