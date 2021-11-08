import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function ShowProfile({ user }) {
  return (
    <Container component="main" maxWidth="xs">
      <Grid className={"d-flex justify-content-center "}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">View Profile</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ mt: 1 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{user.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>NRIC</TableCell>
                  <TableCell>{user.nric}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Contact</TableCell>
                  <TableCell>{user.contactNum}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("en-GB").format(
                      new Date(user.dateOfBirth)
                    )}
                  </TableCell>
                </TableRow>

                {user.isAdmin ? (
                  <>
                    <TableRow>
                      <TableCell>Admin</TableCell>
                      <TableCell>Yes</TableCell>
                    </TableRow>
                  </>
                ) : (
                  <></>
                )}

                {user.isStaff ? (
                  <>
                    <TableRow>
                      <TableCell>Staff Type</TableCell>
                      <TableCell>{user.staffType}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Qualification Type</TableCell>
                      <TableCell>{user.qualificationType}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Approved</TableCell>
                      <TableCell>{user.approved ? "Yes" : "No"}</TableCell>
                    </TableRow>
                  </>
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Container>
  );
}

export default ShowProfile;
