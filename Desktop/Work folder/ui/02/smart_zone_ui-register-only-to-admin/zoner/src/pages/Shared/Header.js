import React, { useEffect } from "react";

// Routers
import { Outlet, useNavigate } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { removeToken, setToken, toggleMode } from "../../features/userSlice";

// MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AbcIcon from "@mui/icons-material/Abc";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';

// requests
import requests from "../../requests";

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.user.accessToken);
  const user = useSelector((state) => state.user.userData);
  const mode = useSelector((state) => state.user.darkmode);

  // For Drawer menu
  const [drawerState, setDrawerState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState(open);
  };

  let menuList_1 =
    user?.account_type === "admin"
      ? [
          {
            label: "Manage account",
            icon: <ManageAccountsIcon />,
            action: () => navigate("/manage-users"),
          },
        ]
      : [];
  // Menu list
  menuList_1 = menuList_1.concat([
    {
      label: "Manual Zoning",
      icon: <HighlightAltIcon />,
      action: () => navigate("/manualZoning"),
    },
    {
      label: "Action 3",
      icon: <AbcIcon />,
      action: () => navigate("/manage-accounts"),
    },
  ]);
  const menuList_2 = [
    { label: "More action 1", icon: <AbcIcon /> },
    { label: "More action 2", icon: <AbcIcon /> },
  ];
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuList_1.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={item.action}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuList_2.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // let accessToken_in_localStorage = window.localStorage.getItem("access_token");
  // dispatch(setToken({ accessToken: accessToken_in_localStorage }));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeMode = () => {
    dispatch(toggleMode());
  };

  const logoutHandler = async () => {
    const req = requests.init(accessToken);
    await req.logout();
    dispatch(removeToken(null));
    // window.localStorage.removeItem("access_token");
    // window.localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const profileHandler = () => {
    navigate("/user-profile", { state: { user: user } });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {accessToken && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setDrawerState(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={"left"}
                open={drawerState}
                onClose={toggleDrawer(false)}
              >
                {list()}
              </Drawer>
            </>
          )}

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            textAlign="center"
            onClick={() => navigate("/")}
          >
            Smart Zone
          </Typography>
          {accessToken ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                // sx={{ mr: 2 }}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={profileHandler}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ ml: 1 }}
                onClick={changeMode}
              >
                {mode ? <NightlightRoundIcon /> : <LightModeIcon />}
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ ml: 1 }}
                onClick={changeMode}
              >
                {mode ? <NightlightRoundIcon /> : <LightModeIcon />}
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default Header;
