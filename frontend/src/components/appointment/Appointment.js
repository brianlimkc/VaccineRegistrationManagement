import React, { useEffect, useState } from "react";
// import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  FormControl,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

function Appointment({ user, setUser }) {
  const [availRoster, setAvailRoster] = useState([]);
  const [timeSlotState, setTimeSlotState] = useState([]);
  const [apptUpdate, setApptUpdate] = useState({
    userID: null,
    date1: null,
    time1: null,
    rosterID1: null,
    center1: null,
    date2: null,
    time2: null,
    rosterID2: null,
    center2: null,
  });

  const day = 86400000;
  let dateNow = Date.now() - (Date.now() % day);

  const timeSlot = {
    1: "9:00 am",
    2: "10:00 am",
    3: "11:00 am",
    4: "12:00 pm",
    5: "2:00 pm",
    6: "3:00 pm",
    7: "4:00 pm",
    8: "5:00 pm",
  };

  useEffect(() => {
    getAvailCenters(dateNow);
    setApptUpdate((prevState) => ({ ...prevState, userID: user._id }));
  }, [user, dateNow]);

  async function getAvailCenters(date) {
    try {
      let {
        data: { outputArray },
      } = await axios.get(`/api/schedule/availCenters/${date}`);
      setAvailRoster(outputArray);
    } catch (e) {
      console.log(e);
    }
  }

  function update(e) {
    setApptUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function updateTimeSlot(e, id) {
    update(e);
    let tempTimeSlot = {};

    Object.assign(tempTimeSlot, timeSlot);
    let roster = [];

    switch (id) {
      case 1:
        roster = availRoster[apptUpdate.date1][apptUpdate.center1];
        break;
      case 2:
        roster = availRoster[apptUpdate.date2][apptUpdate.center2];
        break;
      default:
    }

    roster
      .filter((roster) => roster._id === e.target.value)[0]
      .apptArray.forEach((appt) => {
        delete tempTimeSlot[appt.time];
      });
    setTimeSlotState(tempTimeSlot);
  }

  async function submit() {
    try {
      await axios.post("/api/schedule/bookAppt", apptUpdate);
      await updateUser();
      setApptUpdate({
        userID: user._id,
        date1: null,
        time1: null,
        rosterID1: null,
        center1: null,
        date2: null,
        time2: null,
        rosterID2: null,
        center2: null,
      });
    } catch (e) {}
  }

  async function updateUser() {
    try {
      let { data } = await axios.get("/api/auth/user", {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      });
      await setUser(data.user);
    } catch (e) {}
  }

  return (
    <Container component="main">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            Vaccination Booking
          </Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{user.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>{user.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>
                    {user.dateOfBirth ? (
                      new Intl.DateTimeFormat("en-GB").format(
                        new Date(user.dateOfBirth)
                      )
                    ) : (
                      <></>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Appointment One</TableCell>
                  <TableCell>
                    {user.firstShotApptID ? (
                      <>
                        Date :{" "}
                        {new Intl.DateTimeFormat("en-GB").format(
                          new Date(user.firstShotApptID.date)
                        )}{" "}
                        / Time: {timeSlot[user.firstShotApptID.time]}
                      </>
                    ) : (
                      <>Not Booked</>
                    )}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Appointment Two</TableCell>
                  <TableCell>
                    {user.SecondShotApptID ? (
                      <>
                        Date :{" "}
                        {new Intl.DateTimeFormat("en-GB").format(
                          new Date(user.SecondShotApptID.date)
                        )}{" "}
                        / Time: {timeSlot[user.SecondShotApptID.time]}
                      </>
                    ) : (
                      <>Not Booked</>
                    )}
                  </TableCell>
                </TableRow>
                {/* <TableRow>
                        <TableCell>Appointment Two</TableCell>
                        <TableCell>Date : {new Intl.DateTimeFormat("en-GB").format(
                                new Date(user.secondShotApptID.date)
                            )} / Time: {timeSlot[user.secondShotApptID.time]}</TableCell>
                        </TableRow> */}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={6}>
          <Typography component="h1" variant="h5">
            First appointment
          </Typography>

          <Typography>Available Date(s)</Typography>

          <Grid component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Date
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="dateSelect1"
                  name="date1"
                  value={apptUpdate.date1}
                  onChange={(e) => {
                    update(e);
                  }}
                  label="Select a date"
                >
                  {Object.entries(availRoster).map(([key]) => {
                    return (
                      <MenuItem id={key} value={key}>
                        {new Intl.DateTimeFormat("en-GB").format(
                          new Date(parseInt(key))
                        )}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {apptUpdate.date1 ? (
            <>
              <Typography>Available Center(s)</Typography>

              <Grid component="form" sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Center
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="centerSelect1"
                      name="center1"
                      value={apptUpdate.center1}
                      onChange={(e) => {
                        update(e);
                      }}
                      label="Select a date"
                    >
                      {Object.entries(availRoster[apptUpdate.date1]).map(
                        ([key]) => {
                          return (
                            <MenuItem id={key} value={key}>
                              {key}
                            </MenuItem>
                          );
                        }
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </>
          ) : (
            <></>
          )}

          {apptUpdate.center1 ? (
            <>
              <Typography>Available Room(s)</Typography>

              <Grid component="form" sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Room
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="rosterSelect1"
                      name="rosterID1"
                      value={apptUpdate.rosterID1}
                      onChange={(e) => {
                        updateTimeSlot(e, 1);
                      }}
                      label="Select a room"
                    >
                      {Object.entries(
                        availRoster[apptUpdate.date1][apptUpdate.center1]
                      ).map(([key, value]) => {
                        return (
                          <MenuItem id={key} value={value._id}>
                            {value.roomName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </>
          ) : (
            <></>
          )}

          {apptUpdate.rosterID1 ? (
            <>
              <Typography>Available Timeslot</Typography>

              <Grid component="form" sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Timeslot
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="timeslotSelect1"
                      name="time1"
                      value={apptUpdate.time1}
                      onChange={(e) => {
                        update(e);
                      }}
                      label="Select a timeslot"
                    >
                      {Object.entries(timeSlotState).map(([key, value]) => {
                        return (
                          <MenuItem id={key} value={key}>
                            {value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>

        {apptUpdate.time1 ? (
          <>
            <Grid item xs={6}>
              <Typography component="h1" variant="h5">
                Second appointment
              </Typography>

              <Typography>Available Date(s)</Typography>

              <Grid component="form" sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Date
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="dateSelect2"
                      name="date2"
                      value={apptUpdate.date2}
                      onChange={(e) => {
                        update(e);
                      }}
                      label="Select a date"
                    >
                      {Object.entries(availRoster)
                        .filter(
                          (key) =>
                            parseInt(key) >
                            parseInt(apptUpdate.date1) + day * 14
                        )
                        .map(([key]) => {
                          return (
                            <MenuItem id={key} value={key}>
                              {new Intl.DateTimeFormat("en-GB").format(
                                new Date(parseInt(key))
                              )}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {apptUpdate.date2 ? (
                <>
                  <Typography>Available Center(s)</Typography>

                  <Grid component="form" sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Select Center
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="centerSelect2"
                          name="center2"
                          value={apptUpdate.center2}
                          onChange={(e) => {
                            update(e);
                          }}
                          label="Select a date"
                        >
                          {Object.entries(availRoster[apptUpdate.date2]).map(
                            ([key]) => {
                              return (
                                <MenuItem id={key} value={key}>
                                  {key}
                                </MenuItem>
                              );
                            }
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <></>
              )}

              {apptUpdate.center2 ? (
                <>
                  <Typography>Available Room(s)</Typography>

                  <Grid component="form" sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Select Room
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="rosterSelect2"
                          name="rosterID2"
                          value={apptUpdate.rosterID2}
                          onChange={(e) => {
                            updateTimeSlot(e, 2);
                          }}
                          label="Select a room"
                        >
                          {Object.entries(
                            availRoster[apptUpdate.date2][apptUpdate.center2]
                          ).map(([key, value]) => {
                            return (
                              <MenuItem id={key} value={value._id}>
                                {value.roomName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <></>
              )}

              {apptUpdate.rosterID2 ? (
                <>
                  <Typography>Available Timeslot</Typography>

                  <Grid component="form" sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Select Timeslot
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="timeslotSelect2"
                          name="time2"
                          value={apptUpdate.time2}
                          onChange={(e) => {
                            update(e);
                          }}
                          label="Select a timeslot"
                        >
                          {Object.entries(timeSlotState).map(([key, value]) => {
                            return (
                              <MenuItem id={key} value={key}>
                                {value}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </>
        ) : (
          <></>
        )}

        <Button
          onClick={submit}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Book Appt
        </Button>
      </Grid>
    </Container>
  );
}

export default Appointment;
