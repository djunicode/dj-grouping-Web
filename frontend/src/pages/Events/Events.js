import * as React from "react";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./Events.scss";
import { useDispatch, useSelector } from "react-redux";
import { ViewEvents } from "../../REDUX/Actions/eventsAction";

const Events = () => {
  const dispatch = useDispatch();

  const viewEvents = useSelector((state) => state.viewEvents);

  const { loading, error, userEvents } = viewEvents;

  useEffect(() => {
    dispatch(ViewEvents());
  }, [dispatch]);

  return (
    <div className="events">
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h3>error</h3>
      ) : (
        <>
          <Typography gutterBottom variant="h5" component="div">
            Upcoming Events
          </Typography>
          <center>
            <Box sx={{ flexGrow: 1 }} className="events_box">
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {userEvents.map((_, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <Card className="events_card">
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://images.unsplash.com/photo-1537824598505-99ee03483384?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2NlbmVyeXxlbnwwfHwwfHw%3D&w=1000&q=80"
                          alt=""
                          className="events_image"
                        />
                        <CardContent>
                          <Divider></Divider>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            className="events_name"
                          >
                            event name
                            {userEvents.event_name}                           
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </center>
          <Typography gutterBottom variant="h5" component="div">
            Hackathons
          </Typography>
          <center>
            <Box sx={{ flexGrow: 1 }} className="events_box">
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {userEvents.map((_, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <Card className="events_card">
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://images.unsplash.com/photo-1537824598505-99ee03483384?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2NlbmVyeXxlbnwwfHwwfHw%3D&w=1000&q=80"
                          alt=""
                          className="events_image"
                        />
                        <CardContent>
                          <Divider></Divider>
                          <Typography gutterBottom variant="h6" component="div">
                          {userEvents.event_name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </center>
        </>
      )}
    </div>
  );
};
export default Events;
