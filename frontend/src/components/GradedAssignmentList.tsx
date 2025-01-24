import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { Grade } from "../types";

interface GradedAssignmentListProps {
  error?: string;
  grades: Grade[];
}

export default function GradedAssignmentList(props: GradedAssignmentListProps) {
  const { error, grades } = props;

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Feedback</TableCell>
            <TableCell>Teacher</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {error && (
            <TableRow>
              <TableCell>{error}</TableCell>
            </TableRow>
          )}
          {grades.length === 0 && (
            <TableRow>
              <TableCell>{"You don't have any grades."}</TableCell>
            </TableRow>
          )}
          {grades.map((grade) => (
            <TableRow key={grade.id}>
              <TableCell>{grade.assignment.title}</TableCell>
              <TableCell>{grade.assignment.subject}</TableCell>
              <TableCell>{grade.score}</TableCell>
              <TableCell>{grade.feedback}</TableCell>
              <TableCell>{grade.teacher.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
