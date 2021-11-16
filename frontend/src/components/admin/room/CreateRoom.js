import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { checkForm } from "../../common/checkForm";
import FormAlert from "../../common/FormAlert";


function CreateRoom({ centerID, center, getRoomArray }) {
  const [roomData, setRoomData] = useState({ name: "" });
  const [alertState, setAlertState] = useState({
    type: "error",
    status: false,
    message: "",
  });
  const [errorState, setErrorState] = useState({
    nameValid: false,
    nameMsg: "",
  });


  async function submit(e) {
    e.preventDefault();

    if (checkForm(roomData,setErrorState,setAlertState)) {
      try {
        let {
          data: { room },
        } = await axios.post("/api/room/create", roomData);
        await axios.get(`/api/room/rosterPopulate/${room._id}`);
        getRoomArray(centerID);
        setAlertState({
          type: "success",
          status: true,
          message: "Room successfully created",
        });
        setTimeout(() => {
          setAlertState({
            type: "success",
            status: false,
            message: "",
          });
        }, 3000);
      } catch (e) {
        console.log(e);
        setAlertState({
          type: "error",
          status: true,
          message: "Error in room creation",
        });
      }
    }
  }

  async function change(e) {
    await setRoomData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      centerID: center._id,
      centerName: center.name,
    }));
  }


  return (
    <Container component="main" fullWidth>
      <Grid className={"d-flex justify-content-center mt-3"}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormAlert alertState={alertState}/>

          <Typography component="h1" variant="h5">
            Create a new Room
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={submit}
            sx={{ mt: 2, width: "100%", maxWidth: "sm" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Room Name"
                  onChange={change}
                  autoFocus
                  error={errorState.nameValid}
                  helperText={errorState.nameMsg}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  type="submit"
                  id="submit"
                  fullWidth
                  size="small"
                  variant="contained"
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}

export default CreateRoom;
