import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import EditRoom from "./EditRoom";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import RoomInfo from "./RoomInfo";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import RoomRoster from "./RoomRoster";
import Typography from "@mui/material/Typography";
import FormAlert from "../../common/FormAlert";
import { alertStateConst } from "../../common/constants";

function ShowRoom() {
  const { roomID } = useParams();
  let history = useHistory();
  const [room, setRoom] = useState({});
  const [center, setCenter] = useState({});
  const [editState, setEditState] = useState(false);
  const [alertState, setAlertState] = useState(alertStateConst);

  useEffect(() => {
    getRoom(roomID);
  }, [roomID]);

  async function getRoom(id) {
    try {
      let {
        data: { room },
      } = await axios.get(`/api/room/show/${id}`);
      await setRoom(room);
      await setCenter(room.centerID);
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteRoom(id) {
    try {
      await axios.delete(`/api/room/delete/${id}`);
      setAlertState({
        type: "success",
        status: true,
        message: "Room Deleted!",
      });
      setTimeout(() => {
        history.goBack();
      }, 1250);
      resetAlert();
    } catch (e) {
      console.log(e);
    }
  }

  function goBack() {
    history.push(`/admin/showcenter/${center._id}`);
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

  return (
    <Container component="main" maxWidth="lg">
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
          View Room
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {!editState ? (
            <RoomInfo room={room} center={center} />
          ) : (
            <EditRoom
              room={room}
              center={center}
              setEditState={setEditState}
              setRoom={setRoom}
            />
          )}

          <FormAlert alertState={alertState} />

          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{ margin: 1 }}
              id="goBack"
              variant="contained"
              onClick={goBack}
            >
              Go Back
            </Button>
            <Button
              sx={{ margin: 1 }}
              id="editRoom"
              variant="contained"
              onClick={() => setEditState(true)}
            >
              Edit Room
            </Button>
            <Button
              sx={{ margin: 1 }}
              id="deleteRoom"
              variant="contained"
              onClick={() => deleteRoom(roomID)}
            >
              Delete
            </Button>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <RoomRoster
              room={room}
              setAlertState={setAlertState}
              resetAlert={resetAlert}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ShowRoom;
