import React,{ useEffect, useState } from "react";
import { Typography, Card, CardContent, Box, Grid, Button } from "@mui/material";
import "./Profile.scss";

const Interest = () => {
  const [data,setData]=useState()
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  useEffect(()=>{
  fetch("http://omshukla.pythonanywhere.com/dashboard/interest/4/", requestOptions)
    .then(response => response.json())
    .then(result => setData(result))
    .catch(error => console.log('error', error));
  },[])
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
        {data?
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
                  {data.slice(0,8).map((item, index) => (
                    <Grid item xs={2} sm={4} md={3} key={index}>
                      <div className="profile_interests"><Button value={item.name} onClick={(e)=>{console.log(e.target.value)}}>{item.name}</Button></div>
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
                  {data.slice(8,-1).map((item, index) => (
                    <Grid item xs={2} sm={4} md={3} key={index}>
                      <div className="profile_interests"><Button>{item.name}</Button></div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
            <Button className="profile_button">Proceed</Button>
          </CardContent>
          :<h1>Loading....</h1>}
        </Card>
      </Box>
    </div>
  );
};

export default Interest;
