import React, { useState } from "react";

// CSS
import styles from "./Landing.module.css";

// router
import { useNavigate } from "react-router-dom";

// requests
import requests from "../../requests";

// MUI
import TextField from "@mui/material/TextField";
import { Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { CssBaseline } from '@mui/material';

// validator
import validator from "validator";

// Snackbar - notistack
import { VariantType, useSnackbar } from "notistack";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const action = (snackbarId) => (
    <>
      <CssBaseline />
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

  const [email, setEmail] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const sendOtpHandler = async () => {
    try {
      validate(email);
      const request = requests.init();
      const res = await request.sendOTP(email);
      console.log("res: ", res);
      navigate(`/otp-process/${email}`);
      const options = { variant: "success", autoHideDuration: 1500 };
      enqueueSnackbar("OTP sent", { ...options, action });
    } catch (error) {
      console.log("error: ", error);
      const options = { variant: "error", autoHideDuration: 1500 };
      enqueueSnackbar(error, { ...options, action });
    }
  };

  const validate = (email) => {
    if (!validator.isEmail(email)) throw "Type a valid email";
  };

  return (
    <>
      <Container>
        <Stack spacing={2}>
          <Typography variant="p">
            Type your email, lets see what we can do
          </Typography>{" "}
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={emailChangeHandler}
          />
          <Button
            onClick={() => {
              sendOtpHandler();
            }}
          >
            Send OTP
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default ForgotPassword;
