import React from "react";
import { useEffect, useState } from "react";

// router
import { useLocation, useNavigate } from "react-router-dom";

// Local
import Header from "../Shared/Header";

// Redux
import { useSelector, useDispatch } from "react-redux";

// requests
import requests from "../../requests";

// MUI
import { TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Box } from "@mui/system";
import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Modal from "@mui/material/Modal";

const UserProfile = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const [user, setUser] = useState({});
  const [passwordOpen, setPasswordOpen] = useState(false);

  const location = useLocation();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(
    () => async () => {
      const req = requests.init(accessToken);
      const data = await req.userData();
      setUser(data);
    },
    []
  );

  const disable =
    user.account_type === "admin"
      ? false
      : user.email === location.state.email
      ? false
      : true;
  return (
    <>
      <Header />
      <CssBaseline />
      <Modal open={passwordOpen} onClose={() => setPasswordOpen(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3">
            Password
          </Typography>
          <Stack spacing={2} mt={5}>
            <TextField required label="Old Password" />
            <TextField required label="New Password" />
            <TextField required label="Confirm New Password" />
            <Button>Submit</Button>
          </Stack>
        </Box>
      </Modal>
      <Container>
        <Typography variant="h3">Account details</Typography>
        <Box
          sx={{
            margin: "auto",
            width: 400,
            height: 300,
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "primary.dark",
            // "&:hover": {
            //   backgroundColor: "primary.main",
            //   opacity: [0.9, 0.8, 0.7],
            // },
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            mb={2}
            justifyContent="space-between"
          >
            <InputLabel>Username: </InputLabel>
            <TextField
              size="small"
              value={location.state.user.username}
              // disabled={disable}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            mb={2}
            justifyContent="space-between"
          >
            <InputLabel>Role: </InputLabel>
            <TextField
              size="small"
              value={location.state.user.account_type}
              disabled={disable}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            mb={2}
            justifyContent="space-between"
          >
            <InputLabel>Email: </InputLabel>
            <TextField
              size="small"
              value={location.state.user.email}
              disabled={disable}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            mb={2}
            justifyContent="space-between"
          >
            <InputLabel>Activity: </InputLabel>
            <TextField
              size="small"
              value={location.state.user.account_status}
              disabled={true}
            />
          </Stack>
          <Stack direction="row" spacing={2} mb={2} justifyContent="flex-start">
            {/* <InputLabel>Password</InputLabel> */}
            <Button
              variant="contained"
              color="warning"
              onClick={() => setPasswordOpen(true)}
            >
              Change Password
            </Button>
          </Stack>
          <Stack direction="row" justifyContent="flex-end">
            <Button>Cancel</Button>
            <Button>Save changes</Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default UserProfile;
