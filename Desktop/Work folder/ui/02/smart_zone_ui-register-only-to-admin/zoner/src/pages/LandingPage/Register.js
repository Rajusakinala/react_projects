import React, { useState } from "react";

// Local files
import Header from "../Shared/Header";

// CSS
import styles from "./Landing.module.css";

// requests
import requests from "../../requests";

// Router
import { useNavigate } from "react-router-dom";

// Validator
import validator from "validator";

// MUI
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Buttons
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

// Snackbar - notistack
import { VariantType, useSnackbar } from "notistack";

// Icons
import CloseIcon from "@mui/icons-material/Close";

const Register = () => {
  // Input data from user
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  // For navigation
  const navigate = useNavigate();

  // display alerts
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

  const changeHandler = (e) => {
    if (e.target.name !== "confirmPassword") {
      setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    } else setConfirmPassword(e.target.value);
  };

  const registerHandler = async () => {
    try {
      if (confirmPassword === registerData.password) {
        validate(registerData);
        const req = requests.init();
        const data = await req.register(registerData);
        navigate("/login");
        const options = { variant: "success", autoHideDuration: 1500 };
        enqueueSnackbar("Registered Successfully!", { ...options, action });
      } else throw "Passwords(confirm password and password) doesn't match";
    } catch (error) {
      const options = { variant: "error", autoHideDuration: 1500 };
      if (!error)
        return enqueueSnackbar("Server not running", { ...options, action });
      enqueueSnackbar(error, { ...options, action });
      console.log(error);
    }
  };

  const validate = (data) => {
    const { email, password, username } = data;
    if (!validator.isEmail(email)) throw "Enter a valid email";
    if (!validator.isStrongPassword(password)) throw "Try stronger password";
    if (!username) throw "Username is must";
    return;
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Box className={styles.content}>
        <Stack
          direction="row"
          spacing={10}
          justifyContent="center"
          alignItems="center"
        >
          <Stack>
            <Typography variant="h2">Welcome to Smart Zone!</Typography>
            <Typography variant="p">Create an account now!</Typography>
          </Stack>
          <Stack spacing={2} mt={5} className={styles.input_form}>
            <Typography variant="h3">Register</Typography>
            <TextField
              required
              onChange={changeHandler}
              label="Email"
              name="email"
              value={registerData.email}
            />
            <TextField
              required
              onChange={changeHandler}
              label="Username"
              name="username"
              value={registerData.username}
            />
            <TextField
              required
              onChange={changeHandler}
              label="Password"
              name="password"
              type="password"
              value={registerData.password}
              // helperText="Should contain atleast 8 characters with 1 lowercase, 1 uppercase, 1 number and atleast a symbol"
            />
            <TextField
              required
              onChange={changeHandler}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
            />
            <Button variant="contained" onClick={registerHandler}>
              Register
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Register;
