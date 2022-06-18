import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { Link, useNavigate } from "react-router-dom";
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
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
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
        <Link to={`/createpfp`} style={{ textDecoration: "none" }}>
          <ListItem button key="home">
            <ListItemIcon>
              <HiOutlineArrowNarrowRight style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>
              <span style={{ fontSize: "25px", color: "white" }}>Profile</span>
            </ListItemText>
          </ListItem>
        </Link>
        {["Events", "Interest"].map((text, index) => (
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
        <Link to={`/groupformed`} style={{ textDecoration: "none" }}>
          <ListItem button key="home">
            <ListItemIcon>
              <HiOutlineArrowNarrowRight style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>
              <span style={{ fontSize: "25px", color: "white" }}>Groups</span>
            </ListItemText>
          </ListItem>
        </Link>
        <Link to={`/oceanques`} style={{ textDecoration: "none" }}>
          <ListItem button key="home">
            <ListItemIcon>
              <HiOutlineArrowNarrowRight style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>
              <span style={{ fontSize: "25px", color: "white" }}>Questions</span>
            </ListItemText>
          </ListItem>
        </Link>
      </List>
    </Box>
  );
  const name = localStorage.getItem("email").charAt(0).toUpperCase();
  // console.log(name);

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
              <Link to="/createpfp">
                <button className="btn">Profile</button>
              </Link>
              <Link to="/events">
                <button className="btn">Events</button>
              </Link>
              <Link to="/interest">
                <button className="btn">Interests</button>
              </Link>
              <Link to="/groupformed">
                <button className="btn">Groups</button>
              </Link>
              <Link to="/oceanques">
                <button className="btn">Questions</button>
              </Link>
            </div>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar className="avatar">
                  {/* <Link
                    to="/profile/2"
                    style={{ textDecoration: "none", color: "white" }}
                  > */}
                    {name}
                  {/* </Link> */}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    navigate("/profile/2");
                  }}
                >
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    navigate("/login");
                    localStorage.removeItem("loginToken");
                    localStorage.removeItem("userToken");
                    localStorage.removeItem("user_id");
                  }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
