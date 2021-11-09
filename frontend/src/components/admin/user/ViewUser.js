import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
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
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import Alert from "@mui/material/Alert";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  p: 2,
  px: 4,
  pb: 3,
};

function ViewUser() {
  const { userID } = useParams();
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState();
  const [schedule, setSchedule] = useState({});
  const [availRoster, setAvailRoster] = useState([]);
  const [rosterUpdate, setRosterUpdate] = useState({
    oldDoc: userID,
    newDoc: userID,
    oldRoster: null,
    newRoster: "",
  });
  let history = useHistory();
  const day = 86400000;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [alertState, setAlertState] = useState({
    type: "error",
    status: false,
    message: "",
  });

  useEffect(() => {
    getUser(userID);
  }, [userID]);

  useEffect(() => {
    async function submit() {
      try {
        await axios.post(`/api/auth/updateUser/${user._id}`, user, {
          headers: {
            authorization: `Bearer ${localStorage.token}`,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }

    submit();
  }, [update]);

  async function getUser(id) {
    try {
      let {
        data: { user },
      } = await axios.get(`/api/auth/getUser/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      });
      await setUser(user);
    } catch (e) {
      console.log(e);
    }
  }
 

  useEffect(() => {
    function generateSchedule() {
      let dateTimeNow = Date.now();
      var timePortion = dateTimeNow % (3600 * 1000 * 24);
      var dateNow = dateTimeNow - timePortion;
      let dateFuture = dateNow + day * 31;

      let scheduleArr = {};

      for (let i = dateNow; i < dateFuture; i += day) {
        scheduleArr[i] = {};
      }

      let rosterArr = user.rosterArray;

      if (rosterArr !== undefined) {
        rosterArr.forEach((roster) => {
          let date = roster.date;
          scheduleArr[date] = {
            centerName: roster.centerName,
            roomName: roster.roomName,
            rosterID: roster._id,
          };
        });
      }

      setSchedule((prevState) => ({ ...prevState, ...scheduleArr }));
    }

    generateSchedule();
  }, [user]);

  function toggleApproval() {
    let approved = user.approved;
    setUser((prevState) => ({ ...prevState, approved: !approved }));
    setUpdate(approved);

    if (!approved) {
      setAlertState({
        type: "success",
        status: true,
        message: "Doctor has been approved",
      });
    } else {
      setAlertState({
        type: "error",
        status: true,
        message: "Doctor has been un-approved",
      });
    }
    resetAlert();
  }

  function back() {
    history.goBack();
  }

  function resetAlert() {
    setTimeout(() => {
      setAlertState({
        type: "error",
        status: false,
        message: "",
      });
    }, 1250);
  }

  async function getAvailRoster(date, oldRosterID) {
    setRosterUpdate((prevState) => ({
      ...prevState,
      oldDoc: userID,
      newDoc: userID,
      oldRoster: oldRosterID,
      newRoster: null,
    }));

    try {
      let {
        data: { rosterArray },
      } = await axios.get(`/api/schedule/availRoster/${date}`);
      setAvailRoster(rosterArray);
    } catch (e) {
      console.log(e);
    }

    handleOpen();
  }

  async function deleteAcct() {
    try {
      await axios.delete(`/api/auth/delete/${user._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      });

      setAlertState({
        type: "success",
        status: true,
        message: "User has been deleted",
      });
      setTimeout(() => {
        history.push("/admin/user");
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  async function assignRoom() {
    try {
      await axios.post("/api/schedule/updateRoster", rosterUpdate);

      setAlertState({
        type: "success",
        status: true,
        message: "Doctor has been assigned",
      });
    } catch (e) {
      console.log(e);
      setAlertState({
        type: "error",
        status: true,
        message: "Error in assigning room",
      });
    }

    resetAlert();
    getUser(userID);
    handleClose();
  }

  function updateRosterChoice(e) {
    setRosterUpdate((prevState) => ({
      ...prevState,
      newRoster: e.target.value,
    }));
  }

  return (
    <Container component="main" maxWidth="md">
      <Grid className={"d-flex justify-content-center mt-3"}>
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            User Management
          </Typography>
          {alertState.status ? (
            <Alert id="alert" severity={alertState.type}>
              {alertState.message}
            </Alert>
          ) : (
            <></>
          )}

          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography variant="h5">View User Profile</Typography>
              <TableContainer
                component={Paper}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Table sx={{ width: 400 }} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>{user.name}</TableCell>
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
                        {user.dateOfBirth ? (
                          new Intl.DateTimeFormat("en-GB").format(
                            new Date(user.dateOfBirth)
                          )
                        ) : (
                          <></>
                        )}
                      </TableCell>
                    </TableRow>

                    {user.isStaff ? (
                      <>
                        <TableRow>
                          <TableCell>Staff Type</TableCell>
                          <TableCell>{user.staffType}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Qualifications</TableCell>
                          <TableCell>{user.qualificationType}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Approved</TableCell>
                          <TableCell>
                            {user.approved ? <>Yes</> : <>No</>}
                            <Button
                              size="small"
                              sx={{ marginLeft: 1 }}
                              variant="contained"
                              id="toggleApprove"
                              onClick={() => {
                                toggleApproval();
                              }}
                            >
                              {user.approved ? "Un-Approve" : "Approve"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      </>
                    ) : (
                      <>
                        <TableRow>
                          <TableCell>Health Issues</TableCell>
                          <TableCell>{user.healthIssues}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Consent Given</TableCell>
                          <TableCell>{user.consentGiven}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Vaccination Status</TableCell>
                          <TableCell>{user.VaccinationStatus}</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>First Shot Taken</TableCell>
                          <TableCell>{user.firstShotTaken}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Second Shot Taken</TableCell>
                          <TableCell>{user.secondShotTaken}</TableCell>
                        </TableRow>
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                sx={{ marginTop: 2, marginLeft: 1 }}
                variant="contained"
                onClick={back}
              >
                Go Back
              </Button>

              <Button
                sx={{ marginTop: 2, marginLeft: 1 }}
                id="deleteUser"
                variant="contained"
                onClick={() => deleteAcct()}
              >
                Delete
              </Button>
            </Grid>

            {user.isStaff ? (
              <>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <Typography variant="h5">Schedule List</Typography>
                  <TableContainer
                    sx={{
                      height: 600,
                      overflow: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Table sx={{ width: 400 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Center/Room</TableCell>
                          <TableCell>Assign</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {Object.entries(schedule).map(([key, value]) => {
                          return (
                            <>
                              <TableRow id={key}>
                                <TableCell>{`${
                                  key ? (
                                    new Intl.DateTimeFormat("en-GB").format(
                                      new Date(parseInt(key))
                                    )
                                  ) : (
                                    <></>
                                  )
                                }`}</TableCell>
                                <TableCell>
                                  {`${
                                    value.centerName ? value.centerName : "NA"
                                  } / ${
                                    value.roomName ? value.roomName : "NA"
                                  }`}{" "}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    id={new Intl.DateTimeFormat("en-GB").format(
                                      new Date(parseInt(key))
                                    )}
                                    onClick={() => {
                                      if (!update) {
                                        getAvailRoster(key, value.rosterID);
                                      } else {
                                        setAlertState({
                                          type: "error",
                                          status: true,
                                          message:
                                            "Unable to Assign. Doctor is pending approval",
                                        });
                                        resetAlert();
                                      }
                                    }}
                                  >
                                    Assign
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </>
            ) : (
              <></>
            )}

            <StyledModal
              aria-labelledby="unstyled-modal-title"
              aria-describedby="unstyled-modal-description"
              open={open}
              onClose={handleClose}
              BackdropComponent={Backdrop}
            >
              <Box sx={style}>
                <h2 id="unstyled-modal-title">Assign Roster</h2>
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Select Room
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="roomSelect"
                        name="roomSelect"
                        value={rosterUpdate.newRoster}
                        onChange={(e) => {
                          updateRosterChoice(e);
                        }}
                        label="Select a room"
                      >
                        <MenuItem id={0} value={""}>
                          Set to Empty
                        </MenuItem>
                        {availRoster.map((roster, id) => {
                          return (
                            <MenuItem
                              id={`${roster.centerName} / ${roster.roomName}`}
                              value={roster._id}
                            >
                              {roster.centerName} / {roster.roomName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      id="assign"
                      onClick={assignRoom}
                    >
                      Assign
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </StyledModal>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
}

export default ViewUser;
