import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";


function CreateCenter({ getAllCenters }) {
  const [centerData, setCenterData] = useState({
    name: "",
    shotType: "",
    streetAddress: "",
    postalCode: "",
    contactNumber: "",
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

  function checkForm() {
    let validForm = true;
    let tempFormData = centerData;

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

    if (tempFormData.shotType === "") {
      setErrorState((prevState) => ({
        ...prevState,
        shotValid: true,
        shotMsg: "Please select a shot type",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        shotValid: false,
        shotMsg: "",
      }));
    }

    if (tempFormData.streetAddress === "") {
      setErrorState((prevState) => ({
        ...prevState,
        addressValid: true,
        addressMsg: "Please enter an address",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        addressValid: false,
        addressMsg: "",
      }));
    }

    if (!postalCheck(tempFormData.postalCode)) {
      setErrorState((prevState) => ({
        ...prevState,
        postalValid: true,
        postalMsg: "Please enter a valid postal code",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        postalValid: false,
        postalMsg: "",
      }));
    }

    if (!contactCheck(tempFormData.contactNumber)) {
      setErrorState((prevState) => ({
        ...prevState,
        contactValid: true,
        contactMsg: "Please enter a valid contact number",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        contactValid: false,
        contactMsg: "",
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
    }

    return validForm;
  }

  function contactCheck(contact) {
    const regexp = /^(?=.*[0-9])(?=.{8,})/;
    return regexp.test(contact);
  }

  function postalCheck(postal) {
    const regexp = /^(?=.*[0-9])(?=.{6,})/;
    return regexp.test(postal);
  }

  async function submit(e) {
    e.preventDefault();

    if (checkForm()) {
      try {
          await axios.post("/api/center/create", centerData, {
          headers: {
            authorization: `Bearer ${localStorage.token}`,
          },
        });

        getAllCenters();
        setAlertState({
          type: "success",
          status: true,
          message: "Center created",
        });

        setTimeout(reset, 1250);
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

  function reset() {
    setAlertState({
      type: "error",
      status: false,
      message: "",
    });
  }

  async function change(e) {
    await setCenterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <Container component="main" maxWidth="md">
      <Grid className={"d-flex justify-content-center mt-3"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create a new center
          </Typography>

          {alertState.status ? (
            <Alert id="alert" severity={alertState.type}>
              {alertState.message}
            </Alert>
          ) : (
            <></>
          )}

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
                  name="shotType"
                  placeholder="Pfizer"
                  onChange={change}
                  error={errorState.shotValid}
                  helperText={errorState.shotMsg}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="streetAddress"
                  name="streetAddress"
                  label="Address"
                  onChange={change}
                  error={errorState.addressValid}
                  helperText={errorState.addressMsg}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  name="postalCode"
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
                  name="contactNumber"
                  onChange={change}
                  error={errorState.contactValid}
                  helperText={errorState.contactMsg}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              id="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create New Center
            </Button>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}

export default CreateCenter;
