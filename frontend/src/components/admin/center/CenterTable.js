import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

function CenterTable({ center }) {
  return (
    <>
      <Typography component="h1" variant="h5">
        Center Details
      </Typography>
      <TableContainer sx={{ maxWidth: 500 }}>
        <Table sx={{ mt: 1 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>Center ID</TableCell>
              <TableCell>{center.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{center.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vaccine Type Offered</TableCell>
              <TableCell>{center.shotType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>{center.streetAddress}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Postal Code</TableCell>
              <TableCell>{center.postalCode}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Contact Number</TableCell>
              <TableCell>{center.contactNumber}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CenterTable;
