import './App.css';
import Login from "../src/pages/Login/Login"
import SignUp from "../src/pages/SignUp/SignUp"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Events from './pages/Events/Events';
import ProfileScreen from './pages/Main_profile_display/ProfileScreen';
import GroupFormed from './pages/Groups/GroupFormed';
import { Provider } from 'react-redux';
import store from './REDUX/store';
import Navbar from './pages/Navbar/Navbar';
import QnA from './pages/QnA/QnA';
import Profile_Create from './pages/Create_profileMain/Profile_Create';
import Interest from './pages/Interest/Profile';
function App() {
  return (
    <div className="App">
      <Provider store={store} >
        <Router>
          <Routes>
            <Route exact path="/" element={<><SignUp /></>} />
            <Route exact path="/login" element={<><Login /></>} />
            <Route exact path="/createpfp" element={<><Profile_Create/></>} />
            <Route exact path="/events" element={<><Navbar/><Events /></>} />
            <Route exact path="/interest" element={<><Interest/></>} />
            <Route exact path="/profile/:id" element={<><Navbar/><ProfileScreen /></>} />
            <Route exact path="/groupformed" element={<><Navbar/><GroupFormed /></>} />
            <Route exact path="/oceanques" element={<><Navbar/><QnA /></>} />
          </Routes>
        </Router>
      </Provider>

    </div>
  );
}

export default App;
