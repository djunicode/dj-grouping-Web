import * as React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "../Create_profileMain/TextField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./SignUp.scss";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../REDUX";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

const theme = createTheme();

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("This field is Required"),
  password: Yup.string()
    .min(8, "Password should atleast contain 8 characters")
    .required("This field is Required"),
});

export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSignup = useSelector((state) => state.signUp);
  // const { loading , error , userToken } = userSignup
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   dispatch(signup(email, password));
  useEffect(() => {
    console.log(userSignup);
    console.log(userSignup.error);

    if (userSignup.error) {
      console.log(userSignup.error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } else if (userSignup.userToken) {
      console.log(userSignup.userToken);

      Swal.fire({
        icon: "success",
        title: "SignUp Successful!",
        text: "Check your mail for email verification",
      });

      navigate("/login");
    }
  }, [navigate, userSignup]);

  // };

  return (
    <ThemeProvider theme={theme}>
      {userSignup.loading === true ? (
        <h1>Loading</h1>
      ) : (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            component={Paper}
            elevation={6}
            square
            style={{ backgroundColor: "#151C20" }}
          >
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                console.log(values);
                console.log("clicked");
                dispatch(signup(values.email, values.password));
              }}
            >
              <div className="signup">
                <Typography
                  component="h1"
                  variant="h4"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 700,
                    fontSize: "2.4rem",
                  }}
                >
                  Signup
                </Typography>
                <br />
                <Form>
                  <Box
                    // component="form"
                    noValidate
                    // onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <Typography
                      component="h1"
                      variant="h6"
                      style={{ fontFamily: "Poppins" }}
                    >
                      Email
                    </Typography>
                    <TextField
                      fullWidth
                      id="email"
                      placeholder="Email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      autoFocus
                      style={{ backgroundColor: "white" }}
                    />
                    <br />
                    <br />
                    <Typography
                      component="h1"
                      variant="h6"
                      style={{ fontFamily: "Poppins" }}
                    >
                      Password
                    </Typography>
                    <TextField
                      fullWidth
                      name="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      style={{ backgroundColor: "white" }}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                      sx={{
                        mt: 3,
                        mb: 2,
                        color: "#151C20",
                        "&:hover": {
                          backgroundColor: "#FFB103",
                        },
                      }}
                    >
                      Create an account
                    </Button>
                    <Link to="/login" className="SignLink">
                      {"Already have an account? Login"}
                    </Link>
                  </Box>
                </Form>
              </div>
            </Formik>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={6}
            sx={{
              backgroundImage:
                "url(https://img.freepik.com/free-vector/flat-trendy-fashion-portraits-cover-pack_52683-67139.jpg?t=st=1655329395~exp=1655329995~hmac=978413a271a39f3c3da0d747f947608d89318b6195426e22122a6b83832fdd9b&w=996)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundColor: "#FFB103",
              backgroundPosition: "center",
            }}
          />
        </Grid>
      )}
    </ThemeProvider>
  );
}
