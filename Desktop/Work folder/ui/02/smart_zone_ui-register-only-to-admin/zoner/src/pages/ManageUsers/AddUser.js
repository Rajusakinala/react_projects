import React from "react";

// Local
import Header from "../Shared/Header";

// MUI
import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function AddUser() {
  return (
    <>
      <Header />
      <CssBaseline />
      <Box>
        <Typography
          variant="h2"
          justifyContent="center"
          mx="auto"
          textAlign="center"
        >
          Add User
        </Typography>
        <Stack spacing={2} mt={5}>
          <TextField
            required
            //   onChange={changeHandler}
            label="Email"
            name="email"
            //   value={registerData.email}
          />
          <TextField
            required
            //   onChange={changeHandler}
            label="Username"
            name="username"
            //   value={registerData.username}
          />
          <Button variant="contained">Add User</Button>
        </Stack>
      </Box>
    </>
  );
}

export default AddUser;
