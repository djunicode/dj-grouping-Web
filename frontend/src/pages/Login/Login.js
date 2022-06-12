import * as React from "react";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
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

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    console.log(userLogin);
    console.log(userLogin.error);

    if (userLogin.error) {
      console.log(userLogin.error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Incorrect password!",
      });
    } else if (userLogin.loginToken) {
      console.log(userLogin.loginToken);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        // text: "Check your mail for email verification",
      });
      navigate("/createprofile");
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
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
              <div className="login">
                <Typography
                  component="h1"
                  variant="h4"
                  style={{ fontFamily: "Poppins" }}
                >
                  Login
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
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
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    style={{ backgroundColor: "white" }}
                  />
                  <Typography
                    component="h1"
                    variant="h6"
                    style={{ fontFamily: "Poppins" }}
                  >
                    Password
                  </Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    placeholder="Password"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    style={{ backgroundColor: "white" }}
                  />
                  {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      color: "#151C20",
                      "&:hover": {
                        backgroundColor: "#FFC800",
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Grid container>
                    {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                    <Grid item>
                      <Link
                        to="/"
                        variant="body2"
                        style={{ color: "white", fontFamily: "Poppins" }}
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  {/* <Copyright sx={{ mt: 5 }} /> */}
                </Box>
              </div>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={6}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
      )}
    </ThemeProvider>
  );
}
