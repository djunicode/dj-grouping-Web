import { Box, Grid, Button, Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import Swal from "sweetalert2";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createprofile } from "../../REDUX";


const INITIAL_FORM_STATE = {
  first_name: "",
  last_name: "",
  sapId: "",
  year_of_passing: "",
  branch: "",
  bio: "",
  user: "",
  mobile_no: "",
};

const FORM_VALIDATION = Yup.object().shape({
  // email: Yup.string().email("Invalid Email").required("This field is Required"),
  sapId: Yup.number()
    .min(11, "Invalid Sap ID")
    .integer()
    .typeError("Please enter a valid SapId")
    .required("This field is Required"),
  year_of_passing: Yup.number().required("This field is Required"),
  branch: Yup.string().required("This field is Required"),
  bio: Yup.string().required("This field is Required"),
  first_name: Yup.string().required("This field is Required"),
  last_name: Yup.string().required("This field is Required"),
  mobile_no: Yup.string().required("This field is Required")
    .matches(/^[6-9]\d{9}$/, "Phone number is not valid"),
});

const apireq = (rawdata) => {
  const user = localStorage.getItem("user_id");
  console.log({ ...rawdata, user: user})
  axios.post(
    "https://omshukla.pythonanywhere.com/dashboard/userprofile/",
    { ...rawdata, user: user},
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )
  .then((res) => {
    console.log(res.data);
    localStorage.setItem("name", JSON.stringify(res.data.first_name));
    localStorage.setItem("user_id", JSON.stringify(res.data.id));
  });
}

const Profile_Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createProfile = useSelector((state) => state.createProfile);
  const [details, setDetails] = useState([]);
  const [notes, setNotes] = useState([]);


  return (
    <div style={{ backgroundColor: "#F8F8F8" }}>
      <center>
        <div
          style={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "36px",
            color: "black",
            paddingTop: "40px",
          }}
        >
          Profile Page
        </div>
      </center>
      <Box
        sx={{
          backgroundColor: "#F8F8F8",
          fontFamily: "Poppins",
          padding: { md: "4% 15%", sx: "2% 8%", xs: "1% 5%" },
        }}
      >
        <Card sx={{ padding: "0% 2%" }}>
          <CardContent>
            <Grid container>
              <Grid item sx={{ width: "100%", marginTop: "3%" }}>
                <Formik
                  initialValues={{ ...INITIAL_FORM_STATE }}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={(values) => {
                    console.log(notes);
                    var data = {
                      first_name: `${values.first_name}`,
                      last_name: `${values.last_name}`,
                      mobile_no: `+91${values.mobile_no}`,
                      sap_id: `${values.sapId}`,
                      year_of_passing: `${values.year_of_passing}`,
                      branch: `${values.branch}`,
                      user: `${localStorage.getItem("id")}`,
                      bio: `${values.bio}`,
                      barcode: notes,
                    };
                    apireq(data);
                    // dispatch(createprofile(
                    //   `${values.first_name}`,
                    //   `${values.last_name}`,
                    //   `+91${values.mobile_no}`,
                    //   `${values.sapId}`,
                    //   `${values.year_of_passing}`,
                    //   `${values.branch}`,
                    //   `${localStorage.getItem("id")}`,
                    //   `${values.bio}`,
                    //   notes));
                    if(localStorage.getItem("name")){
                      navigate("/interest");
                    }
                  }}
                >
                  <Form>
                    <Grid container spacing={4} rowSpacing={4}>
                      <Grid item md={6} xs={12}>
                        <div>First Name</div>
                        <TextField
                          name="first_name"
                          // placeholder={details.first_name}
                          // type="email"
                          required
                          style={{ color: "black" }}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <div>Last Name</div>
                        <TextField
                          name="last_name"
                          // placeholder={details.last_name}
                          // type="email"
                          required
                          style={{ color: "black" }}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <div>Phone Number</div>
                        <TextField
                          name="mobile_no"
                          placeholder="Phone number"
                        // required
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <div>SAP ID</div>
                        <TextField
                          name="sapId"
                          placeholder="SAP ID"
                        // inputProps={{
                        //   readOnly:true,
                        // }}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <div>Year of passing</div>
                        <TextField name="year_of_passing" placeholder="Add year" />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <div>Branch</div>
                        <TextField name="branch" placeholder="Add branch" />
                      </Grid>

                      <Grid item md={12} xs={12}>
                        <div>Bio</div>
                        <TextField
                          name="bio"
                          multiline
                          placeholder="Add bio"
                          required
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <div>Barcode</div>
                        <input
                          name="barcode"
                          type='file'
                          onChange={(e) => { 
                            console.log(e.target.files[0]);
                            setNotes(e.target.files[0]) }}
                            // setNotes(URL.createObjectURL(e.target.files[0])) }}
                          placeholder="barcode"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          sx={{
                            width: "100%",
                            backgroundColor: "#FFB103",
                            borderRadius: "4px",
                            color: "white",
                            border: "2px solid white",
                            height: "50px",
                            textTransform: "none",
                            fontWeight: "bold",
                          }}
                        >
                          SAVE CHANGES
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                </Formik>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Profile_Create;
