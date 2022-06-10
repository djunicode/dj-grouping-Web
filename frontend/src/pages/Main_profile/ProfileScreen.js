import { Link, Paper } from "@mui/material";
import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(Viewprofile());
  }, [dispatch]);

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
                    <p className="profileDetailsFilled">
                      {userProfile.first_name} {userProfile.last_name}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="profileDetails">Sap-ID : </p>
                  </td>
                  <td>
                    <p className="profileDetailsFilled">{userProfile.sap_id}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="profileDetails">Mobile-No : </p>
                  </td>
                  <td>
                    <p className="profileDetailsFilled">
                      {userProfile.mobile_no}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="profileDetails">Branch </p>
                  </td>
                  <td>
                    <p className="profileDetailsFilled">{userProfile.branch}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="profileDetails">Graduating Year : </p>
                  </td>
                  <td>
                    <p className="profileDetailsFilled">
                      &nbsp;{userProfile.year_of_passing}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="profileDetails">Bio </p>
                  </td>
                  <td>
                    <p className="profileDetailsFilled">{userProfile.bio}</p>
                  </td>
                </tr>
              </table>
            </center>
          </>
        )}
      </Paper>
    </div>
  );
};

export default ProfileScreen;
