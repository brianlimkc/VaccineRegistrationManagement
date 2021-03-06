import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Alert from "@mui/material/Alert";

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

    if (checkForm()) {
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

  function checkForm() {
    let validForm = true;
    let tempFormData = roomData;

    if (tempFormData.name === "") {
      setErrorState((prevState) => ({
        ...prevState,
        nameValid: true,
        nameMsg: "Please enter a name",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        nameValid: false,
        nameMsg: "",
      }));
    }

    if (!validForm) {
      setAlertState({
        type: "error",
        status: true,
        message: "Error in form, please check!",
      });
    } else {
      setAlertState({
        type: "",
        status: false,
        message: "",
      });

      setTimeout(() => {
        setAlertState({
          type: "success",
          status: false,
          message: "",
        });
      }, 1250);
    }

    return validForm;
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
          {alertState.status ? (
            <Alert id="alert" severity={alertState.type}>
              {alertState.message}
            </Alert>
          ) : (
            <></>
          )}
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
