import React, { useRef } from "react";
import { useEffect, useState } from "react";

// router
import { useLocation, useNavigate } from "react-router-dom";

// request
import requests from "../../requests";

// redux
import { useSelector } from "react-redux";

// Local
import Header from "../Shared/Header";

// MUI
import { CssBaseline } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const accessToken = useSelector((state) => state.user.accessToken);

  const [openAddUser, setOpenAddUser] = React.useState(false);
  const handleOpenAddUser = () => setOpenAddUser(true);
  const handleCloseAddUser = () => setOpenAddUser(false);

  const newUserRole = useRef("");
  const newUserEmail = useRef("");
  const newUserName = useRef("");

  useEffect(
    () => async () => {
      const req = requests.init(accessToken);
      const userRows = await req.allUsers();
      console.log("userRows: ", userRows);
      setUsers(userRows);
    },
    []
  );

  const removeUser = async (id) => {
    const req = requests.init(accessToken);
    const res = req.removeUser(id);
    const temp = Object.assign([], users);
    const idx = temp.findIndex((user) => user._id === id);
    temp.splice(idx, 1);
    setUsers(temp);
  };

  const columnNames = [
    { label: "S.no", align: "left" },
    { label: "Username", align: "left" },
    { label: "Email", align: "center" },
    { label: "Status", align: "center" },
    { label: "Role", align: "center" },
    { label: "Last login", align: "center" },
    { label: "Action", align: "center" },
  ];

  const speedDials = [
    { icon: <PersonAddIcon />, name: "Add User", action: handleOpenAddUser },
  ];

  const rolesForUsers = ["Admin", "user"];

  const addUserStyle = {
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

  const AddUserHandler = async () => {
    const req = requests.init(accessToken);
    const data = await req.addInactiveUser({
      email: newUserEmail.current.value.toLowerCase(),
      username: newUserName.current.value,
      account_type: newUserRole.current.value.toLowerCase(),
    });
    setUsers([...users, data]);
  };

  const editHandler = (user) => {
    navigate("/user-profile", { state: { user: user } });
  };

  return (
    <>
      <Header />
      <CssBaseline />

      {/* Modal for Add User */}
      <Modal
        open={openAddUser}
        onClose={handleCloseAddUser}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={addUserStyle}>
          <Typography
            variant="h3"
            justifyContent="center"
            mx="auto"
            textAlign="center"
          >
            Add User
          </Typography>
          <Stack spacing={2} mt={5}>
            <TextField required inputRef={newUserEmail} label="Email" />
            <TextField required inputRef={newUserName} label="Username" />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              inputRef={newUserRole}
              label="Role"
            >
              {rolesForUsers.map((role) => (
                <MenuItem value={role}>{role}</MenuItem>
              ))}
            </Select>
            <Button onClick={AddUserHandler}>Add User</Button>
          </Stack>
        </Box>
      </Modal>

      {/* Modal for Edit user */}
      <Modal
        open={openAddUser}
        onClose={handleCloseAddUser}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={addUserStyle}>
          <Typography
            variant="h3"
            justifyContent="center"
            mx="auto"
            textAlign="center"
          >
            Add User
          </Typography>
          <Stack spacing={2} mt={5}>
            <TextField required inputRef={newUserEmail} label="Email" />
            <TextField required inputRef={newUserName} label="Username" />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              inputRef={newUserRole}
              label="Role"
            >
              {rolesForUsers.map((role) => (
                <MenuItem value={role}>{role}</MenuItem>
              ))}
            </Select>
            <Button onClick={AddUserHandler}>Add User</Button>
          </Stack>
        </Box>
      </Modal>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 24, right: 28 }}
        icon={<SpeedDialIcon />}
      >
        {speedDials.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.action}
          />
        ))}
      </SpeedDial>
      <Typography variant="h2" align="center" m={2}>
        User accounts
      </Typography>
      <TableContainer component={Container}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columnNames.map((item) => {
                return (
                  <TableCell align={item.align}>{item.label}&nbsp;</TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, idx) => (
              <TableRow
                hover
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.account_status}</TableCell>
                <TableCell align="center">{row.account_type}</TableCell>
                <TableCell align="center">
                  {row.login_logs.length
                    ? new Date(
                        row.login_logs[row.login_logs.length - 1]
                      ).toDateString()
                    : "N/A"}
                </TableCell>
                <TableCell align="center">
                  <Stack
                    direction="row"
                    spacing={2}
                    divider={<Divider orientation="vertical" flexItem />}
                    justifyContent="center"
                  >
                    <Button onClick={() => editHandler(row)}>Edit</Button>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => removeUser(row._id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ManageUsers;
