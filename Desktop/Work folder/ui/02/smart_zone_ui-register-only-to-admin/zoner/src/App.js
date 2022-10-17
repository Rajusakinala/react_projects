import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Local
import ManualZoning from "./pages/manual/ManualZoning";
import Login from "./pages/LandingPage/Login";
import Register from "./pages/LandingPage/Register";
import Homepage from "./pages/Homepage/Homepage";
import UserProfile from "./pages/ManageUsers/UserProfile";
import ForgotPassword from "./pages/LandingPage/ForgotPassword";
import VerifyOTP from "./pages/LandingPage/VerifyOTP";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import AddUser from "./pages/ManageUsers/AddUser";
import Zone from "./pages/Dashboard/Zone";

// Notification
import { SnackbarProvider } from "notistack";

// MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Redux
import { useSelector } from "react-redux";

function App() {
  const mode = useSelector((state) => state.user.darkmode);
  const theme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
      // mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={5}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/otp-process/:email" element={<VerifyOTP />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/add-user" element={<AddUser />} />
            {/* <Route path="/zone" element={<Zone />} /> */}
            <Route path="/manualZoning" element={<ManualZoning/>} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
