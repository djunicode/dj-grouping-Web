import React from "react";
import "./QnA.scss";
import {
  Typography,
  Card,
  CardContent,
  Box,
//   Grid,
  Button,
  Container,
} from "@mui/material";
// import { color } from "@mui/system";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useState, useEffect } from "react";

const QnA = () => {
  const [Questions, setQuestions] = useState([]);
  const [Answers, setAnswers] = useState([]);
  useEffect(() => {
    axios.get(`https://omshukla.pythonanywhere.com/dashboard/oceanques/`)
      .then(res => {
        setQuestions(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  console.log(Questions);
  console.log(Answers);

  const answerReq = () => {
    Answers.map(ans => {
      console.log(ans);
      axios.post(`https://omshukla.pythonanywhere.com/dashboard/oceanans/60004200072/`,ans)
        .then(res => {
          console.log(res.data);
        })
    })
  }

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
            {/* <Button className="QnA_button" onClick={answerReq}>Proceed</Button> */}
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
              {
                Questions.map(ques => {
                  return <> <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    padding: "2% 0 0 0",
                    fontFamily: "Poppins",
                  }}
                >
                  <p>{ques.id}. {ques.question} </p>
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
                      onChange={(event,newValue)=>{
                        if(newValue!==null){
                          setAnswers([{quesinst:ques.id, answer:newValue, user:4},...Answers]);
                        }
                      }}
                    />
                    <p className="margin">Most Likely</p>
                  </div>
                </Typography> </>
                })
              }
            </CardContent>
            <Button className="QnA_button" onClick={answerReq}>Proceed</Button>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default QnA;
