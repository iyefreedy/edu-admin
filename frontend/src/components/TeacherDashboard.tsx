import * as yup from "yup";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import useFetchAssignments from "../hooks/useFetchAssignments";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Assignment, Subject } from "../types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const gradeSchema = yup.object().shape({
  feedback: yup.string().required(),
  score: yup.number().min(0).max(100).required(),
});

export default function TeacherDashboard() {
  const {
    state: assignments,
    error,
    subject,
    setSubject,
    gradeAssignment,
  } = useFetchAssignments();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment>();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(gradeSchema),
  });

  const handleOpenDialog = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedAssignment(undefined);
    setOpenDialog(false);
  };

  const handleSubmitGrade = handleSubmit(async (data) => {
    await gradeAssignment({ ...data, assignmentId: selectedAssignment!.id });
  });

  return (
    <div>
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, Teacher!
        </Typography>

        <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
          Student assignments
        </Typography>

        <FormControl fullWidth>
          <InputLabel>Subject</InputLabel>
          <Select
            value={subject ?? ""}
            onChange={(e) => setSubject(e.target.value as Subject)}
            label="Subject"
          >
            <MenuItem value="ENGLISH">English</MenuItem>
            <MenuItem value="MATH">Math</MenuItem>
          </Select>
        </FormControl>

        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Student</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {error && (
                <TableRow>
                  <TableCell>{error}</TableCell>
                </TableRow>
              )}
              {assignments.length === 0 && !error && (
                <TableRow>
                  <TableCell>{"No assignments to display."}</TableCell>
                </TableRow>
              )}
              {assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>{assignment.subject}</TableCell>
                  <TableCell>{assignment.student.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog(assignment)}
                      disabled={Boolean(assignment.grade)}
                    >
                      Grade
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Grade Assignment Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Grade Assignment</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            Assignment: {selectedAssignment?.title}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Subject: {selectedAssignment?.subject}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Score"
            type="number"
            fullWidth
            {...register("score")}
            error={!!errors.score}
            helperText={errors.score?.message}
          />
          <TextField
            margin="dense"
            label="Feedback"
            type="text"
            fullWidth
            multiline
            rows={4}
            {...register("feedback")}
            error={!!errors.feedback}
            helperText={errors.feedback?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitGrade} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
