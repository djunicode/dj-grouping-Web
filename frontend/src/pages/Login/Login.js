import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../REDUX";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TextField from "../Create_profileMain/TextField";
import { Formik, Form } from "formik";
import * as Yup from "yup";

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

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const handleSubmit = (event) => {
    // event.preventDefault();
    dispatch(login(email, password));
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    console.log(userLogin);
    console.log(userLogin.error);

    if (userLogin.error) {
      console.log(userLogin.error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Incorrect password!",
      });
    } else if (!userLogin.loginToken) {
      console.log(userLogin.loginToken);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
      });
      navigate("/createpfp");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {userLogin.loading === true ? (
        <h1>Loading...</h1>
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
                localStorage.setItem("email", values.email);
                console.log(values);
                console.log("clicked");
                dispatch(login(values.email, values.password));

                console.log(userLogin);
                console.log(userLogin.error);

                if (userLogin.error) {
                  console.log(userLogin.error);

                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Incorrect password!",
                  });
                } else if (!userLogin.loginToken) {
                  console.log(userLogin.loginToken);

                  Swal.fire({
                    icon: "success",
                    title: "Login Successful!",
                  });
                  navigate("/createpfp");
                }
              }}
            >
              <div className="login">
                <Typography
                  component="h1"
                  variant="h4"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 700,
                    fontSize: "2.4rem",
                  }}
                >
                  Login
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
                      // margin="normal"
                      // required
                      fullWidth
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      name="email"
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
                      // margin="normal"
                      // required
                      fullWidth
                      name="password"
                      placeholder="Password"
                      type="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
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
                      Login
                    </Button>
                    <Grid container>
                      <Link to="/" className="SignLink">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
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
                "url(https://img.freepik.com/free-vector/flat-trendy-fashion-portraits-cover-set_52683-67138.jpg?t=st=1655346530~exp=1655347130~hmac=7563b4c7376adefc72040e3a8092958ad2f18eca8f403b6dc0805294ff6c9c1a&w=996)",
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
