import React from "react";
import { Typography, Card, CardContent, Box, Grid, Button } from "@mui/material";
import "./Profile.scss";

const Interest = () => {
  return (
    <div style={{ backgroundColor: "#151C20" }} className="profile">
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        className="profile_heading"
      >
        Create Your Profile by adding Interests
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
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 5 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {Array.from(Array(8)).map((_, index) => (
                    <Grid item xs={12} sm={4} md={3} key={index} className="profile_grid">
                      <div className="profile_interests">Photography</div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
            <div className="profile_otherintersts_div">
              <Typography variant="h5" className="profile_subheading">
                Other Interests
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 5 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {Array.from(Array(8)).map((_, index) => (
                    <Grid item xs={12} sm={4} md={3} key={index} className="profile_grid">
                      <div className="profile_interests">Photography</div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
            <Button className="profile_button">Proceed</Button>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Interest;
