import { Button, Link, Paper } from "@mui/material";
import React, { useEffect,useState } from "react";
import "./MainProfile.scss";
import { useDispatch, useSelector } from "react-redux";
import { Viewprofile } from "../../REDUX/Actions/viewProfileAction";
import { useParams } from "react-router-dom";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log(id);
  localStorage.setItem('userId', (id))
  const viewProfile = useSelector((state) => state.viewProfile);
  const { loading, error, userProfile } = viewProfile;
  var name=""
  useEffect(() => {
    dispatch(Viewprofile());
  }, [dispatch]);
  const [profile,setProfile]=useState({
    first_name:"",
    mobile_no:"",
    branch:"",
    last_name:"",
    sap_id:"",
    year_of_passing:"",
    bio:"",
    user:"",
    })
    var formdata = new FormData();
    const handleSubmit=()=>{
      profile.first_name?
formdata.append("first_name",profile.first_name):formdata.append("first_name",userProfile.first_name);
      profile.last_name?
formdata.append("last_name",profile.last_name):formdata.append("last_name",userProfile.last_name);
      profile.branch?
formdata.append("branch",profile.branch):formdata.append("branch",userProfile.branch);
      profile.year_of_passing?
formdata.append("year_of_passing",profile.year_of_passing):formdata.append("year_of_passing",userProfile.year_of_passing);
      profile.mobile_no?
formdata.append("mobile_no", profile.mobile_no):formdata.append("mobile_no",userProfile.mobile_no);
      profile.bio?
formdata.append("bio", profile.bio):formdata.append("bio",userProfile.bio)
formdata.append("user",userProfile.user);

var requestOptions = {
  method: 'PUT',
  body: formdata,
  redirect: 'follow'
};


fetch("http://omshukla.pythonanywhere.com/dashboard/userprofile-update/1/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error))}
  //console.log(profile.first_name)
  //console.log(profile.mobile_no)
  return (
    <div>
      <Paper elevation={3} className="ProfileData">
        {loading ? (
          <h3>loading...</h3>
        ) : error ? (
          <h3>error</h3>
        ) : (
          <>
            <Link className="editProfileLink">Edit profile</Link>
              
            <br />
            {true?
            <div>
            <img
              src={userProfile.profile_pic}
              alt="person"
              className="profileImage"
            ></img>
            <center>
              <table>
                <tr>
                  <td>
                    <p className="profileDetails">Name : </p>
                  </td>
                  <td>
                    <input className="profileDetailsFilled"
                      defaultValue={userProfile.first_name +"  " +userProfile.last_name}
                      onChange={(e)=>setProfile({first_name:e.target.value})}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="profileDetails">Sap-ID : </p>
                  </td>
                  <td>
                    <input className="profileDetailsFilled" 
                    defaultValue={userProfile.sap_id}
                    onChange={(e)=>setProfile({sap_id:e.target.value})} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="profileDetails">Mobile-No : </p>
                  </td>
                  <td>
                    <input type="text" className="profileDetailsFilled" 
                    defaultValue={userProfile.mobile_no}  
                    onChange={(e)=>setProfile({mobile_no:e.target.value})} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="profileDetails">Branch </p>
                  </td>
                  <td>
                    <input className="profileDetailsFilled" 
                    defaultValue={userProfile.branch}
                    onChange={(e)=>setProfile({branch:e.target.value})} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="profileDetails">Graduating Year : </p>
                  </td>
                  <td>
                    <input className="profileDetailsFilled" 
                    defaultValue={userProfile.year_of_passing}
                    onChange={(e)=>setProfile({year_of_pasing:e.target.value})} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="profileDetails">Bio </p>
                  </td>
                  <td>
                    <input className="profileDetailsFilled"  
                    defaultValue={userProfile.bio}
                    onChange={(e)=>setProfile({bio:e.target.value})} />
                  </td>
                </tr>
              </table>
            </center>
            </div>
            :<h1>Loading</h1>}
            <Button className="editProfileLink" onClick={handleSubmit}>Submit</Button>
          </>
        )}
      </Paper>
    </div>
  );
};

export default ProfileScreen;
