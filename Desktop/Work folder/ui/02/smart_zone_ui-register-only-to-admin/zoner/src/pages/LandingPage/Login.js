import React, { useState } from "react";

// Local files
import Header from "../Shared/Header";
import ForgotPassword from "./ForgotPassword";

// CSS
import styles from "./Landing.module.css";

// requests
import requests from "../../requests";

// router
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Validator
import validator from "validator";

// MUI
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { style } from "@mui/system";
import Modal from "@mui/material/Modal";

// Buttons
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

// Snackbar - notistack
import { VariantType, useSnackbar } from "notistack";

// Icons
import CloseIcon from "@mui/icons-material/Close";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUserData } from "../../features/userSlice";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Forgot password Modal options
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: "0.5rem",
    boxShadow: 24,
    p: 2,
  };

  // Snackbars options
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const action = (snackbarId) => (
    <>
      <IconButton
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
        variant="text"
        color="warning"
      >
        <CloseIcon />
      </IconButton>
    </>
  );
  const loginHandler = async () => {
    try {
      validate(loginData);
      let req = requests.init();
      const data = await req.login(loginData);
      navigate("/homepage");
      dispatch(
        setToken({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );
      req = requests.init(data.accessToken);
      const userData = await req.userData();
      dispatch(setUserData(userData));
      const options = { variant: "success", autoHideDuration: 1500 };
      enqueueSnackbar("Login Success", { ...options, action });
    } catch (error) {
      const options = { variant: "error", autoHideDuration: 1500 };
      if (!error)
        return enqueueSnackbar("Server not running", { ...options, action });
      enqueueSnackbar(error, { ...options, action });
      console.log(error);
    }
  };

  const validate = (data) => {
    const { email, password } = data;
    if (!validator.isEmail(email)) throw "Invalid email";
    if (!password) throw "Type a password";
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ForgotPassword />
        </Box>
      </Modal>
      <Box className={styles.content}>
        <Stack
          direction="row"
          spacing={10}
          justifyContent="center"
          alignItems="center"
        >
          <Stack>
            <Typography variant="h2">Welcome to Smart Zone</Typography>
            <Typography variant="p">Login to start!</Typography>
          </Stack>
          <Stack spacing={2} mt={5} className={styles.input_form}>
            <Typography variant="h3">Login</Typography>

            <TextField
              required
              onChange={changeHandler}
              name="email"
              label="Email"
              value={loginData.email}
            />
            <TextField
              type="password"
              required
              onChange={changeHandler}
              name="password"
              label="Password"
              value={loginData.password}
            />
            <Button variant="contained" onClick={loginHandler}>
              Login
            </Button>
            <Button onClick={handleOpen}>Forgot Passoword?</Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Login;
