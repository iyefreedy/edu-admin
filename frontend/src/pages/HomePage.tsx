import Box from "@mui/material/Box";

import useAuth from "../hooks/useAuth";
import StudentDashboard from "../components/StudentDashboard";
import { Navigate } from "react-router";
import TeacherDashboard from "../components/TeacherDashboard";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

export default function HomePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = async () => {
    const shouldLogout = confirm("Are you sure want to logout?");

    if (shouldLogout) {
      await logout();
    }
  };
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Teacher Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {user.role === "STUDENT" && <StudentDashboard />}
      {user.role === "TEACHER" && <TeacherDashboard />}
    </Box>
  );
}
