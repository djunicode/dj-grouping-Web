import React from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";
import "./Profile.scss";

const Profile = () => {
  return (
    <div style={{ backgroundColor: "#151C20" }} className="profile">
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        className="profile_heading"
      >
        Create Your Profile
      </Typography>
      <Box
        sx={{
          fontFamily: "Poppins",
          padding: { md: "4% 15%", sx: "2% 8%", xs: "1% 5%" },
        }}
      >
        <Card sx={{ padding: "0% 2%", backgroundColor: "#101619" }}>
          <CardContent>
            <div className="profile_interests_div">
              <Typography variant="h5" className="profile_subheading">
                Select your Interests
              </Typography>
              <div className="profile_interests">Photography</div>
            </div>
            <div className="profile_otherintersts_div">
              <Typography variant="h5" className="profile_subheading">
                Other Interests
              </Typography>
              <div className="profile_interests">Photography</div>
            </div>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Profile;
