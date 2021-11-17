import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import FormAlert from "../../common/FormAlert";
import { checkForm } from "../../common/checkForm";
import { roomErrorStateConst, alertStateConst} from "../../common/constants";


function EditCenter({ room, center, setEditState, setRoom }) {
  const [formData, setFormData] = useState({ name: room.name });
  const [alertState, setAlertState] = useState(alertStateConst);
  const [errorState, setErrorState] = useState(roomErrorStateConst);

  async function submit(e) {
    e.preventDefault();
    if (checkForm(formData,setErrorState,setAlertState)) {
      try {
        let {
          data: { updatedRoom },
        } = await axios.post(`/api/room/update/${room._id}`, formData, {});
        setRoom(updatedRoom);
        setAlertState({
          type: "success",
          status: true,
          message: "Room successfully updated",
        });

        setTimeout(() => {
          setEditState(false);
        }, 1250);
      } catch (e) {
        console.log(e);
        setAlertState({
          type: "error",
          status: true,
          message: "Error in updating room",
        });
      }
    }
  }

  async function change(e) {
    await setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  
  return (
    <Box
      sx={{
        marginTop: 9,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FormAlert alertState={alertState}/>

      <Typography component="h1" variant="h5">
        Edit Room
      </Typography>

      <Box component="form" noValidate onSubmit={submit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              label="Room Name"
              defaultValue={room.name}
              onChange={change}
              autoFocus
              error={errorState.nameValid}
              helperText={errorState.nameMsg}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            onClick={() => setEditState(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            id="submit"
            variant="contained"
            sx={{ margin: 1 }}
          >
            Submit
          </Button>
        </Box>

        <Grid container justifyContent="flex-end"></Grid>
      </Box>
    </Box>
  );
}

export default EditCenter;
