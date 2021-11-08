import React, { useEffect, useState } from "react";
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

function UserRoster({ user, setUser }) {
  const [schedule, setSchedule] = useState({});
  const [availRoster, setAvailRoster] = useState([]);
  const [rosterUpdate, setRosterUpdate] = useState({
    oldDoc: user._id,
    newDoc: user._id,
    oldRoster: null,
    newRoster: "",
  });
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
    generateSchedule();
  }, [user]);

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

        if (date !== undefined) {
          scheduleArr[date] = {
            centerName: roster.centerName,
            roomName: roster.roomName,
            rosterID: roster._id,
          };
        }
      });
    }

    setSchedule((prevState) => ({ ...prevState, ...scheduleArr }));
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

  async function assignRoom() {
    try {
      await axios.post("/api/schedule/updateRoster", rosterUpdate);

      setAlertState({
        type: "success",
        status: true,
        message: "Doctor has been assigned",
      });

      getUser(user._id);
    } catch (e) {
      console.log(e);
      setAlertState({
        type: "error",
        status: true,
        message: "Error in assigning room",
      });
    }
    generateSchedule();
    resetAlert();
    handleClose();
  }

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
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Manage Roster
          </Typography>
          {alertState.status ? (
            <Alert id="alert" severity={alertState.type}>
              {alertState.message}
            </Alert>
          ) : (
            <></>
          )}

          <Grid container spacing={2}>
            {Object.keys(schedule).length > 0 ? (
              <>
                <Grid item xs={12}>
                  <TableContainer sx={{ height: 600, overflow: "auto" }}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Center/Room</TableCell>
                          <TableCell>Assign</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {Object.entries(schedule).map(([key, value]) => {
                          let date = new Intl.DateTimeFormat("en-GB").format(
                            new Date(parseInt(key))
                          );

                          return (
                            <>
                              <TableRow id={key}>
                                <TableCell>{`${key ? date : <></>}`}</TableCell>
                                <TableCell>
                                  {`${
                                    value.centerName ? value.centerName : "NA"
                                  } / ${
                                    value.roomName ? value.roomName : "NA"
                                  }`}{" "}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    size="small"
                                    variant="contained"
                                    id={date}
                                    onClick={() => {
                                      getAvailRoster(key, value.rosterID);
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
                      onClick={() => assignRoom()}
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

export default UserRoster;
