import React, { useState } from "react";

// Local
import Header from "../Shared/Header";

// Router
import { useParams } from "react-router-dom";

// MUI
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { CssBaseline } from '@mui/material';

// request
import requests from "../../requests";

// Snackbar - notistack
import { VariantType, useSnackbar } from "notistack";

// validator
import validator from "validator";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const VerifyOTP = () => {
  const { email } = useParams();
  const [state, setState] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [otpVerified, setOtpVerified] = useState(false);

  const changeHandler = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

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

  const verifyOtpHandler = async () => {
    try {
      validateOtp(state.otp);
      const request = requests.init();
      const res = await request.verifyOtp({ email, otp: state.otp });
      if (res === "OTP verified") setOtpVerified(true);
    } catch (error) {
      const options = { variant: "error", autoHideDuration: 1500 };
      enqueueSnackbar(error, { ...options, action });
    }
  };

  const resetPasswordHandler = async () => {
    const request = requests.init();
    const res = await request.resetPassword({
      email,
      password: state.password,
    });
    console.log("res: ", res);
  };

  const validateOtp = (otp) => {
    if (otp.length !== 6) throw "OTP must be of length 6";
  };

  const validatePassword = (password) => {
    if (!validator.isStrongPassword(password)) throw "Try a strong password";
  };

  return (
    <>
      <Header />
      <CssBaseline />
      <Stack direction="row">
        <Box
          sx={{
            margin: "1rem",
          }}
        >
          <Typography variant="h4">OTP here:</Typography>
          <TextField
            required
            label="OTP"
            value={state.otp}
            onChange={changeHandler}
            name="otp"
          />
          <br />
          <br />
          <Button
            variant="contained"
            disabled={!state.otp}
            onClick={verifyOtpHandler}
          >
            Verify
          </Button>
        </Box>
        {/* Setting New Password */}
        {otpVerified && (
          <Box
            sx={{
              margin: "15rem",
              width: "25vw",
            }}
          >
            <Typography variant="h4">New Passoword:</Typography>
            <TextField
              value={state.password}
              onChange={changeHandler}
              name="password"
              fullWidth
              required
              label="Password"
            />
            <br />
            <br />
            <TextField
              value={state.confirmPassword}
              onChange={changeHandler}
              name="confirmPassword"
              fullWidth
              required
              label="Confirm password"
            />
            <br />
            <br />
            <Button
              variant="contained"
              disabled={
                !state?.password?.length ||
                state.password !== state.confirmPassword
              }
              onClick={resetPasswordHandler}
            >
              Reset
            </Button>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default VerifyOTP;
