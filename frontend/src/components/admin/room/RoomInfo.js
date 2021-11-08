import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function RoomInfo({ room, center }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Room Details
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ mt: 1 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>Room Name</TableCell>
              <TableCell>{room.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>{room.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Clinic</TableCell>
              <TableCell>{center.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shot Type</TableCell>
              <TableCell>{center.shotType}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default RoomInfo;
