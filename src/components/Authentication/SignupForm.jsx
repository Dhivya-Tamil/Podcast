import React,{useState} from 'react'
import Input from "../Input"
import Button from "../Button"
import { auth, db, storage} from "../../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth"
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import { setUser } from '../../slices/userSlice';
import { toast } from 'react-toastify';

function SignupForm() {
  const[fullName,setFullName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[confirmPassword,setConfirmPassword] = useState("");
  const[loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleSignup = async()=>{
    console.log("Singup sucess")
    setLoading(true)
    if(password == confirmPassword && password.length >=6){
        try {

            //creating users account
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;
            console.log("user",user)

            //save user's details
            await setDoc(doc(db,"users",user.uid),{
                name: fullName,
                email: user.email,
                uid: user.uid,
            });
            // save data in the redux
            dispatch(
                setUser({
                name: fullName,
                email: user.email,
                uid: user.uid,
            })
            );
            toast.success("Signup Successfully")
            setLoading(false)
            navigate("/profile")
        } 
        catch (e) {
            console.log("error",e)
            toast.error(e.message)
            setLoading(false)
        }
    }
    else{
        if(password != confirmPassword){
            toast.error("Please check password and confirm password matches!")  
            if (password.length < 6){
                toast.error("Please create strong password")
            }
        }
        else if(fullName == "" && email == "" && password == "" && confirmPassword == ""){
            toast.error("Please fill required fields")
        }
        setLoading(false)
    }
  }

  return (
    <div>
        <Input 
            state={fullName} 
            setState={setFullName} 
            placeholder="Full Name" 
            type="text" 
            required={true}
        />
        <Input 
            state={email} 
            setState={setEmail} 
            placeholder="Email"
            type="email" 
            required={true}
         />
        <Input 
            state={password} 
            setState={setPassword} 
            placeholder="Password" 
            type="password"
            required={true}
            />
        <Input 
            state={confirmPassword} 
            setState={setConfirmPassword} 
            placeholder="Confirm Password" 
            type="password" 
            required={true}
            />
        <Button 
            text={loading ? "Loading..." :"Signup"} 
            disabled={loading} 
            onClick={handleSignup} 
        />
    </div>
  )
}

export default SignupForm