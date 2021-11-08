import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function Admin() {
  return (
    <Container component="main" maxWidth="md">
      <Grid className={"d-flex justify-content-center mt-3"}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Admin Panel
          </Typography>

          <a href="/admin/center">Manage Center</a>
          <a href="/admin/user">Manage Users</a>
          <a href="/admin/schedule">Manage Schedule</a>
        </Box>
      </Grid>
    </Container>
  );
}

export default Admin;
