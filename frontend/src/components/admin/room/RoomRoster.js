import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Box,
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
import {StyledModal, Backdrop, style} from "../../common/modalDefault";


function RoomRoster({ room, setAlertState, resetAlert }) {
  const [rosterArray, setRosterArray] = useState([]);
  const [availDocArr, setAvailDocArr] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rosterUpdate, setRosterUpdate] = useState({
    oldDoc: null,
    newDoc: null,
    oldRoster: null,
    newRoster: null,
  });

  useEffect(() => {
    async function populateRoster() {
      try {
        await axios.get(`/api/room/rosterPopulate/${room._id}`);
      } catch (e) {
        console.log(e);
      }
      getRoster(room._id);
    }

    populateRoster();
  }, [room]);


  async function getRoster(id) {
    try {
      let {
        data: { rosterArr },
      } = await axios.get(`/api/room/rosterGet/${id}`);
      let dateTimeNow = Date.now();
      var timePortion = dateTimeNow % (3600 * 1000 * 24);
      var dateNow = dateTimeNow - timePortion;
      rosterArr = rosterArr.filter((roster) => roster.date >= dateNow);
      setRosterArray(rosterArr);
    } catch (e) {
      console.log(e);
    }
  }

  async function getAvailDoc(date, rosterID, docID) {
    setRosterUpdate((prevState) => ({ ...prevState, newDoc: null }));
    try {
      let {
        data: { availDocArray },
      } = await axios.get(`/api/schedule/availDoc/${date}`);
      setAvailDocArr(availDocArray);

      let tempUpdate = {
        oldDoc: docID,
        newRoster: rosterID,
        oldRoster: rosterID,
      };

      setRosterUpdate((prevState) => ({ ...prevState, ...tempUpdate }));
    } catch (e) {
      console.log(e);
    }

    handleOpen();
  }

  async function assignDoc() {
    try {
      await axios.post("/api/schedule/updateRoster", rosterUpdate);
      setAlertState({
        type: "success",
        status: true,
        message: "Room assignment updated",
      });
      resetAlert();
    } catch (e) {
      console.log(e);
      setAlertState({
        type: "error",
        status: true,
        message: "Error in assigning Doctor",
      });
    }
    resetAlert();
    getRoster(room._id);
    handleClose();
  }

  function updateDocChoice(e) {
    setRosterUpdate((prevState) => ({
      ...prevState,
      newDoc: e.target.value,
    }));
  }

  return (
    <Container component="main">
      <Grid className={"d-flex justify-content-center "}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Roster Management
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableContainer sx={{ height: 600, overflow: "auto" }}>
                <Table stickyHeader aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Assigned Doctor</TableCell>
                      <TableCell>Assign</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rosterArray.map((roster) => {
                      return (
                        <>
                          <TableRow>
                            <TableCell>
                              {new Intl.DateTimeFormat("en-GB").format(
                                new Date(roster.date)
                              )}
                            </TableCell>
                            <TableCell>
                              {roster.doctorID ? roster.doctorID.name : "NA"}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                size="small"
                                id={new Intl.DateTimeFormat("en-GB").format(
                                  new Date(parseInt(roster.date))
                                )}
                                onClick={() =>
                                  getAvailDoc(
                                    roster.date,
                                    roster._id,
                                    roster.doctorID ? roster.doctorID._id : null
                                  )
                                }
                              >
                                Assign Doc
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

            <StyledModal
              aria-labelledby="unstyled-modal-title"
              aria-describedby="unstyled-modal-description"
              open={open}
              onClose={handleClose}              
              BackdropComponent={Backdrop}
            >
              <Box sx={style}>
                <h2 id="unstyled-modal-title">Assign Doctor</h2>
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Select Doctor
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="rosterDoc"
                        name="rosterDoc"
                        value={rosterUpdate.newDoc}
                        onChange={(e) => {
                          updateDocChoice(e);
                        }}
                        label="Select a Doctor"
                      >
                        <MenuItem id={"Set to Empty"} value={""}>
                          Set to Empty
                        </MenuItem>
                        {availDocArr.map((doc, id) => {
                          return (
                            <MenuItem id={doc.name} value={doc._id}>
                              {doc.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="contained" id="assign" onClick={assignDoc}>
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

export default RoomRoster;
