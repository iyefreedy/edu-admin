import * as yup from "yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import useFetchStudentAssignments from "../hooks/useFetchStudentAssignments";
import CustomTabPanel from "./CustomTabPanel";
import StudentAssignmentList from "./StudentAssignmentList";
import GradedAssignmentList from "./GradedAssignmentList";
import useFetchGradedAssignment from "../hooks/useFetchGradedAssignment";

const assignmentSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  subject: yup.string().oneOf(["ENGLISH", "MATH"]).required(),
});

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function StudentDashboard() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(assignmentSchema),
  });

  const { assignments, error, createAssignment } = useFetchStudentAssignments();
  const { state: grades } = useFetchGradedAssignment();

  const handleSubmitAssignment = handleSubmit(async (data) => {
    await createAssignment(data);
    handleCloseDialog();
  });

  return (
    <div>
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, Student!
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Submit Assignment
        </Button>

        <Typography variant="h5" sx={{ marginTop: 4 }}>
          Your Grades
        </Typography>

        <Tabs
          value={selectedTab}
          onChange={(_event, tab) => setSelectedTab(tab)}
        >
          <Tab label="Your assignments" {...a11yProps(0)} />
          <Tab label="Your grades" {...a11yProps(1)} />
        </Tabs>

        <CustomTabPanel value={selectedTab} index={0}>
          <StudentAssignmentList assignments={assignments} error={error} />
        </CustomTabPanel>

        <CustomTabPanel value={selectedTab} index={1}>
          <GradedAssignmentList grades={grades} error={error} />
        </CustomTabPanel>
      </Container>

      {/* Submit Assignment Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Submit Assignment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            {...register("title")}
          />
          <TextField
            margin="dense"
            label="Content"
            type="text"
            fullWidth
            multiline
            rows={4}
            {...register("content")}
          />
          <Controller
            name="subject"
            control={control}
            render={({ field: { value } }) => (
              <TextField
                select
                fullWidth
                sx={{ marginTop: 2 }}
                label="Select subject"
                {...register("subject")}
                value={value ?? ""}
              >
                <MenuItem value="ENGLISH">English</MenuItem>
                <MenuItem value="MATH">Math</MenuItem>
              </TextField>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitAssignment} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
