import React from "react";
import "./QnA.scss";
import {
  Typography,
  Card,
  CardContent,
  Box,
//   Grid,
//   Button,
  Container,
} from "@mui/material";
// import { color } from "@mui/system";
import Rating from "@mui/material/Rating";

const QnA = () => {
  return (
    <div style={{ backgroundColor: "#151C20", height: "100%" }}>
      <Container sx={{ fontFamily: "Poppins" }}>
        <Box className="boxProp">
          <Card
            sx={{
              height: "100%",
              width: "100%",
              padding: "0% 2%",
              backgroundColor: "#101619",
              color: "white",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  padding: "2% 0 0 0",
                  color: "white",
                  fontFamily: "Poppins",
                }}
              >
                <span>Profile</span>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  padding: "2% 0 0 0",
                  fontFamily: "Poppins",
                }}
              >
                <p>1. What is your view of XYZ?</p>
              </Typography>
              <Typography
                className="nowrap"
                sx={{
                  padding: "1% 0 0 3%",
                  color: "white",
                  fontFamily: "Poppins",
                }}
              >
                <div className="box">
                  <p className="margin">Least Likely</p>
                  <Rating
                    name="half-rating"
                    defaultValue={2}
                    precision={1}
                    sx={{ margin: "0% 5% " }}
                    size="large"
                  />
                  <p className="margin">Most Likely</p>
                </div>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  padding: "2% 0 0 0",
                  fontFamily: "Poppins",
                }}
              >
                <p>1. What is your view of XYZ?</p>
              </Typography>
              <Typography
                className="nowrap"
                sx={{
                  padding: "1% 0 0 3%",
                  color: "white",
                  fontFamily: "Poppins",
                }}
              >
                <div className="box">
                  <p className="margin">Least Likely</p>
                  <Rating
                    name="half-rating"
                    defaultValue={2}
                    precision={1}
                    sx={{ margin: "0% 5% " }}
                    size="large"
                  />
                  <p className="margin">Most Likely</p>
                </div>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default QnA;
