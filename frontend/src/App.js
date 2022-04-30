import './App.css';
import Login from "../src/pages/Login/Login"
import SignUp from "../src/pages/SignUp/SignUp"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Events from './pages/Events/Events';
import Profile from './pages/Create_profile/Profile';
import ProfileScreen from './pages/Main_profile/ProfileScreen';
import GroupFormed from './pages/Groups/GroupFormed';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element={<><SignUp/></>}/>
        <Route exact path="/login" element={<><Login/></>}/>
        <Route exact path="/events" element={<><Events/></>}/>
        <Route exact path="/createprofile" element={<><Profile/></>}/>
        <Route exact path="/profile" element={<><ProfileScreen/></>}/>
        <Route exact path="/groupformed" element={<><GroupFormed/></>}/>
        </Routes>
        </Router>
    </div>
  );
}

export default App;
