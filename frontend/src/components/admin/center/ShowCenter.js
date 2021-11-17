import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CenterTable from "./CenterTable";
import Container from "@mui/material/Container";
import CreateRoom from "../room/CreateRoom";
import EditCenter from "./EditCenter";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import ShowRooms from "../room/ShowRooms";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import FormAlert from "../../common/FormAlert";

function ShowCenter() {
  const { centerID } = useParams();
  const [center, setCenter] = useState({});
  const [editState, setEditState] = useState(false);
  const [roomArray, setRoomArray] = useState([]);
  const [alertState2, setAlertState2] = useState({
    type: "error",
    status: false,
    message: "",
  });

  let history = useHistory();

  useEffect(() => {
    async function getCenter(id) {
      try {
        let {
          data: { center },
        } = await axios.get(`/api/center/show/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.token}`,
          },
        });
        await setCenter(center);
      } catch (e) {
        console.log(e);
      }
    }

    async function getRoomArray(id) {
      try {
        let {
          data: {
            data: { roomArray },
          },
        } = await axios.get(`/api/room/showall/${id}`);
        await setRoomArray(roomArray);
      } catch (e) {
        console.log(e);
      }
    }

    getCenter(centerID);
    getRoomArray(centerID);
  }, [centerID]);

  async function deleteCenter(id) {
    try {
      await axios.delete(`/api/center/delete/${id}`);
      setAlertState2({
        type: "success",
        status: true,
        message: "Center deleted",
      });
      setTimeout(() => go("/admin/center"), 1250);
    } catch (e) {
      console.log(e);
    }
  }

  function go(address) {
    history.push(address);
  }

  async function getRoomArray(id) {
    try {
      let {
        data: {
          data: { roomArray },
        },
      } = await axios.get(`/api/room/showall/${id}`);
      await setRoomArray(roomArray);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container component="main" maxWidth="md">
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
          View Center
        </Typography>
      </Box>
      <Grid
        className={"d-flex justify-content-center mt-3"}
        container
        spacing={2}
      >
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
          <FormAlert alertState={alertState2}/>

            {!editState ? (
              <CenterTable center={center} />
            ) : (
              <EditCenter center={center} setEditState={setEditState} />
            )}
          </Box>
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
              variant="contained"
              id="goBack"
              onClick={() => go("/admin/center")}
            >
              Go Back
            </Button>
            <Button
              sx={{ margin: 1 }}
              id="editCenter"
              variant="contained"
              onClick={() => setEditState(true)}
            >
              Edit Center
            </Button>
            <Button
              sx={{ margin: 1 }}
              id="deleteCenter"
              variant="contained"
              onClick={() => deleteCenter(center._id)}
            >
              Delete
            </Button>
          </Box>

          <CreateRoom
            centerID={centerID}
            center={center}
            getRoomArray={getRoomArray}
          />
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <ShowRooms
              centerID={centerID}
              center={center}
              roomArray={roomArray}
              getRoomArray={getRoomArray}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ShowCenter;
