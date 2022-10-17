import React from "react";
import Header from "../Shared/Header";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../features/userSlice";

// MUI
import { CssBaseline } from "@mui/material";
import {Typography} from "@mui/material";

const Homepage = (props) => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <CssBaseline />
      <Header />
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Welcome
      </Typography>
    </>
  );
};

export default Homepage;
