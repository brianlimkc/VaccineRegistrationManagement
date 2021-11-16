import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { checkForm } from "../../common/checkForm";
import FormAlert from "../../common/FormAlert";


function EditCenter({ center, setEditState }) {
  let history = useHistory();
  const [formData, setFormData] = useState({
    _id: center._id,
    name: center.name,
    shotType: center.shotType,
    streetAddress: center.streetAddress,
    postalCode: center.postalCode,
    contactNumber: center.contactNumber,
  });
  const [alertState, setAlertState] = useState({
    type: "error",
    status: false,
    message: "",
  });
  const [errorState, setErrorState] = useState({
    nameValid: false,
    nameMsg: "",
    shotValid: false,
    shotMsg: "",
    addressValid: false,
    addressMsg: "",
    postalValid: false,
    postalMsg: "",
    contactValid: false,
    contactMsg: "",
  });

  async function submit(e) {
    e.preventDefault();
    if (checkForm(formData,setErrorState,setAlertState)) {
      try {
        await axios.post("/api/center/update", formData, {});

        setAlertState({
          type: "success",
          status: true,
          message: "Center updated",
        });
        setTimeout(() => {
          history.push("/admin/center");
        }, 1250);
      } catch (e) {
        console.log(e.response.data);
        setAlertState({
          type: "error",
          status: true,
          message: e.response.data.message,
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
    <>
      <Box
        sx={{
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FormAlert alertState={alertState}/>
        <Typography component="h1" variant="h5">
          Edit Center
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
                label="Center Name"
                defaultValue={center.name}
                onChange={change}
                autoFocus
                error={errorState.nameValid}
                helperText={errorState.nameMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="shotType"
                label="Shot Type"
                defaultValue={center.shotType}
                name="shotType"
                autoComplete="shotType"
                onChange={change}
                error={errorState.shotValid}
                helperText={errorState.shotMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="streetAddress"
                label="Address"
                defaultValue={center.streetAddress}
                type="streetAddress"
                id="streetAddress"
                onChange={change}
                error={errorState.addressValid}
                helperText={errorState.addressMsg}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="postalCode"
                label="Postal Code"
                defaultValue={center.postalCode}
                type="postalCode"
                id="postalCode"
                onChange={change}
                error={errorState.postalValid}
                helperText={errorState.postalMsg}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="contactNumber"
                label="Contact Number"
                defaultValue={center.contactNumber}
                name="contactNumber"
                autoComplete="contact"
                onChange={change}
                error={errorState.contactValid}
                helperText={errorState.contactMsg}
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
              id="submitEdit"
              variant="contained"
              sx={{ margin: 1 }}
            >
              Submit
            </Button>
          </Box>

          <Grid container justifyContent="flex-end"></Grid>
        </Box>
      </Box>
    </>
  );
}

export default EditCenter;
