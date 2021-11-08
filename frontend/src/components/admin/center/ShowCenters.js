import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";


import {
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,

} from "@mui/material";

function ShowCenters({ centerArray, getAllCenters }) {
  let history = useHistory();
  let tempArray = [];

  if (centerArray != null) {
    tempArray = [...centerArray];
  }

  function showCenter(id) {
    history.push(`/admin/showcenter/${id}`);
  }

  return (
    <Container component="main" maxWidth="sm">
      <Grid className={"d-flex justify-content-center mt-3"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            List of all Centers
          </Typography>
          <TableContainer
            sx={{
              height: 800,
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Center Name</TableCell>
                <TableCell>Vaccine Type</TableCell>
                <TableCell>View Center</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tempArray.length > 0 ? (
                <>
                  {tempArray.map((center, id) => (
                    <TableRow key={id}>
                      <TableCell>{center.name}</TableCell>
                      <TableCell>{center.shotType}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          id={`${center.name} button`}
                          variant="contained"
                          onClick={() => showCenter(center._id)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <></>
              )}
            </TableBody>
          </TableContainer>
        </Box>
      </Grid>
    </Container>
  );
}

export default ShowCenters;
