import React,{ useEffect, useState } from "react";
import { Typography, Card, CardContent, Box, Grid, Button } from "@mui/material";
import "./Profile.scss";

const Interest = () => {
  const data=[]
  const mainInterests=['Node','Django','PHP','React','Angular','Flutter','react Native','Android','AWS','Google Cloud','Deep learning','NLP']
  const Interests = ['debating','photography','finance','marketing','editorial','creative','dancing','music','painting','travelling'];
  const [status,setStatus] =useState(false)
  const tokenString = localStorage.getItem("user_id");
  const userId = JSON.parse(tokenString);
  console.log(userId)
  const handleClick=()=>{
    const finalData={name:data}
    fetch("http://omshukla.pythonanywhere.com/dashboard/interest/"+userId+"/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(finalData)
  })
  .then(response => response.json())
  .then(result => setStatus(true))
  .catch(error => console.log('error', error));
}
  
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
                  {mainInterests.map((item, index) => (
                    <Grid item xs={2} sm={4} md={3} key={index}>
                      <div className="profile_interests"><Button value={item} onClick={(e)=>{console.log(e.target.value);data.push(e.target.value)}}>{item}</Button></div>
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
                  {Interests.map((item, index) => (
                    <Grid item xs={2} sm={4} md={3} key={index}>
                      <div className="profile_interests"><Button value={item} onClick={(e)=>{console.log(e.target.value);data.push(e.target.value)}}>{item}</Button></div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
            {status?
          <h1 style={{color:"white"}}>Your interests have been updated</h1>:
            <Button className="profile_button" onClick={handleClick}>Proceed</Button>}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Interest;
