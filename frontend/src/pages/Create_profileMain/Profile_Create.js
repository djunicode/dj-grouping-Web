import { Box, Grid, Button, Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import Swal from "sweetalert2";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const INITIAL_FORM_STATE = {
  first_name: "",
  last_name: "",
  sapId: "",
  year: "",
  branch: "",
  bio: "",
  user: "",
  phone: "",
};

const FORM_VALIDATION = Yup.object().shape({
  // email: Yup.string().email("Invalid Email").required("This field is Required"),
  sapId: Yup.number()
    .min(11, "Invalid Sap ID")
    .integer()
    .typeError("Please enter a valid SapId")
    .required("This field is Required"),
  year: Yup.number().required("This field is Required"),
  branch: Yup.string().required("This field is Required"),
  bio: Yup.string().required("This field is Required"),
  first_name: Yup.string().required("This field is Required"),
  last_name: Yup.string().required("This field is Required"),
  phone: Yup.string().required("This field is Required")
    .matches(/^[6-9]\d{9}$/, "Phone number is not valid"),
});

const Profile_Create = () => {
  const navigate = useNavigate()
  const [details, setDetails] = useState([]);
 

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
                    var data = JSON.stringify({
                      email_id: `${details.email}`,
                      phone_no: `+91${values.phone}`,
                      sap_id: `${values.sapId}`,
                      current_year: `${values.year}`,
                      department: `${values.branch}`,
                      domains: `${values.domains}`,
                      skills: `${values.skills}`,
                      resume_drive_link: `${values.resume}`,
                      project_drive_link: `${values.project}`,
                      graduation_year: "2024",
                      user: `${localStorage.getItem("id")}`,
                    });

                    console.log(data);
                    navigate("/interest");
                //     var config = {
                //       method: "POST",
                //       url: "http://djacmdev.pythonanywhere.com/if/student",
                //       headers: {
                //         "Content-Type": "application/json",
                //         Authorization: `Token ${localStorage.getItem("token")}`,
                //       },
                //       data: data,
                //     };

                //     axios(config)
                //       .then(function (response) {
                //         console.log(JSON.stringify(response.data));
                //         navigate('/dashboard')
                //         Swal.fire({
                //           title: "Profile Saved!",
                //           icon: "success",
                //           // confirmButtonText: 'Cool'
                //         });
                //       })
                //       .catch(function (error) {
                //         console.log(error);
                //       });
                  }}
                >
                  <Form>
                    <Grid container spacing={4} rowSpacing={4}>
                      <Grid item md={6} xs={12}>
                        <div>First Name</div>
                        <TextField
                          name="first_name"
                          placeholder={details.first_name}
                          // type="email"
                          required
                          style={{ color: "black" }}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <div>Last Name</div>
                        <TextField
                          name="last_name"
                          placeholder={details.last_name}
                          // type="email"
                          required
                          style={{ color: "black" }}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <div>Phone Number</div>
                        <TextField
                          name="phone"
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
                        <TextField name="year" placeholder="Add year" />
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
                        <div>user</div>
                        <TextField
                          name="user"
                          placeholder="user"
                        required
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
