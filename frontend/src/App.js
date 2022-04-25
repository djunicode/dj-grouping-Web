import './App.css';
import Login from "../src/pages/Login/Login"
import SignUp from "../src/pages/SignUp/SignUp"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Events from './pages/Events/Events';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element={<><SignUp/></>}/>
        <Route exact path="/login" element={<><Login/></>}/>
        <Route exact path="/events" element={<><Events/></>}/>
        <Route exact path="/profile" element={<><Profile/></>}/>
        </Routes>
        </Router>
    </div>
  );
}

export default App;
