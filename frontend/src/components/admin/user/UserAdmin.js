import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import {
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import AddDoctorModal from "./AddDoctorModal";

function UserAdmin() {
  const [patientArray, setPatientArray] = useState([]);
  const [doctorArray, setDoctorArray] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  let history = useHistory();

  useEffect(() => {
    async function getAllUsers() {
      try {
        let {
          data: { doctorArray, patientArray },
        } = await axios.get("/api/auth/getAll");

        setPatientArray(patientArray);
        setDoctorArray(doctorArray);
      } catch (e) {
        console.log(e);
      }
    }

    getAllUsers();
  }, []);

  function goUser(id) {
    history.push(`/admin/user/${id}`);
  }

  return (
    <Container component="main">
      <Box
        sx={{
          display: "flex",
          mt: 2,
          mb: 2,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 1,
        }}
      >
        <Typography component="h1" variant="h4">
          Manage Users
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              columnGap: 1,
            }}
          >
            <Typography component="h1" variant="h5">
              Patient List
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
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Vaccination Status</TableCell>
                  <TableCell>View Patient</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patientArray.map((patient, id) => (
                  <TableRow key={id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.VaccinationStatus}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => goUser(patient._id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              columnGap: 1,
            }}
          >
            <Typography component="h1" variant="h5">
              Doctor List
            </Typography>
            <Button
              onClick={handleOpen}
              id="addDoctor"
              variant="contained"
              size="small"
            >
              Add Doctor
            </Button>
          </Box>
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
                <TableCell>Doctor Name</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>View Doctor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctorArray.map((doctor, id) => (
                <TableRow key={id}>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>
                    {doctor.approved ? "Approved" : "Awaiting"}
                  </TableCell>
                  <TableCell>
                    <Button
                      id={`${doctor.name} button`}
                      variant="contained"
                      size="small"
                      onClick={() => goUser(doctor._id)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </Grid>
      </Grid>

      <AddDoctorModal open={open} setOpen={setOpen} />

    </Container>
  );
}

export default UserAdmin;
