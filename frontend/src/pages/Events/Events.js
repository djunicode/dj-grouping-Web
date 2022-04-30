import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./Events.scss";

const Events = () => {
  return (
    <div className="events">
      <Typography gutterBottom variant="h5" component="div">
        Upcoming Events
      </Typography>
      <br />
      <center>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(Array(4)).map((_, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Card className="events_card">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://images.unsplash.com/photo-1537824598505-99ee03483384?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2NlbmVyeXxlbnwwfHwwfHw%3D&w=1000&q=80"
                      alt="green iguana"
                      className="events_image"
                    />
                    <CardContent>
                      <Divider></Divider>
                      <Typography gutterBottom variant="h6" component="div" style={{textAlign:'left'}}>
                        HackPrep 3.0
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </center>
      <br />
      <Typography gutterBottom variant="h5" component="div">
        Hackathons
      </Typography>
      <br />

      <center>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(Array(4)).map((_, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Card className="events_card">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://images.unsplash.com/photo-1537824598505-99ee03483384?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2NlbmVyeXxlbnwwfHwwfHw%3D&w=1000&q=80"
                      alt="green iguana"
                      className="events_image"
                    />
                    <CardContent>
                      <Divider></Divider>
                      <Typography gutterBottom variant="h6" component="div" style={{textAlign:'left'}}>
                        HackPrep 3.0
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </center>
    </div>
  );
};
export default Events;
