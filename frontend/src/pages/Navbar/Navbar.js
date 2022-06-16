import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import "./Navbar.scss";
import { GrGroup } from "react-icons/gr";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const anchor = "left";
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{ backgroundColor: "black", height: "100%" }}
    >
      <List>
        <Link to={`/`} style={{ textDecoration: "none" }}>
          <ListItem button key="home">
            <ListItemIcon>
              <HiOutlineArrowNarrowRight style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>
              <span style={{ fontSize: "25px", color: "white" }}>Home</span>
            </ListItemText>
          </ListItem>
        </Link>
        {["Dashboard", "Profile"].map((text, index) => (
          <Link
            to={`/${text.toLowerCase()}`}
            style={{ textDecoration: "none" }}
            key={index}
          >
            <ListItem button key={text}>
              <ListItemIcon>
                <HiOutlineArrowNarrowRight style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: "25px", color: "white" }}>{text}</span>
              </ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
  //   const name = sessionStorage.getItem("Name").charAt(0).toUpperCase();

  return (
    <AppBar
      style={{ background: "#151C20", boxShadow: "none" }}
      position="sticky"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <GrGroup style={{ fontSize: "3rem", color: "white" }} />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <React.Fragment key={anchor}>
              <Button
                style={{ fontSize: "2rem" }}
                size="large"
                color="inherit"
                onClick={toggleDrawer(anchor, true)}
              >
                <GiHamburgerMenu style={{ color: "white" }} />
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <div style={{ margin: "auto" }}>
              <Link to="/home">
                <button className="btn">Home</button>
              </Link>
              <Link to="/dashboard">
                <button className="btn">Dashboard</button>
              </Link>
              <Link to="/profile">
                <button className="btn">Profile</button>
              </Link>
            </div>
          </Box>
          <Avatar className="avatar">
            <Link to="/profile/2" style={{textDecoration:"none"}}>
              R
            </Link>
          </Avatar>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
