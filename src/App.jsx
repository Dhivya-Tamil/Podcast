import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import AuthenticatePage from "./pages/AutheticatePage"
import Profile from "./pages/Profile"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";
import { setUser } from "./slices/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PrivateRoutes from "./components/PrivateRoutes";
import CreateApodcast from "./pages/CreateApodcast";
import Podcasts from "./pages/Podcasts";
import PodcastDetail from "./pages/PodcastDetail";
import CreateAnEpisode from "./pages/CreateAnEpisode";


function App() {
  const dispatch = useDispatch()
 useEffect(()=>{
  const unsubscribeAuth = onAuthStateChanged(auth,(user)=>{
    if(user){
      const unsubscribeSnapshot = onSnapshot(
        doc(db,"users",user.uid),
        (userDoc) => {
          if(userDoc.exists()){
            const userData = userDoc.data();
            dispatch(
              setUser({
                name: userData.name,
                email: userData.email,
                uid: user.uid,
              })
            );
          }
        },
        (error) => {
          console.error("Error fetching user data",error)
        }
      );
      return () =>{
        unsubscribeSnapshot();
      };
    }
  });

  return () =>{
    unsubscribeAuth();
  };

 },[])

  return (
    <>
      <div className="App">
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<AuthenticatePage />}></Route>
            <Route path="/" element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/create_a_podcast" element={<CreateApodcast/>}></Route>
            <Route path="/podcasts" element={<Podcasts />}></Route>
            <Route path="/podcast/:id" element={<PodcastDetail />}></Route>
            <Route path="/podcast/:id/create-episode" element={<CreateAnEpisode />}></Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
