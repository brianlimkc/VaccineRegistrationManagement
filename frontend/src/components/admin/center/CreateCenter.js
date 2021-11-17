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
import { centerFormDataConst, centerErrorStateConst, alertStateConst} from "../../common/constants";


function CreateCenter({ getAllCenters }) {
  const [formData, setFormData] = useState(centerFormDataConst);
  const [alertState, setAlertState] = useState(alertStateConst);
  const [errorState, setErrorState] = useState(centerErrorStateConst);
 
  async function submit(e) {
    e.preventDefault();

    if (checkForm(formData,setErrorState,setAlertState)) {
      try {
          await axios.post("/api/center/create", formData, {
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
        setAlertState({
          type: "error",
          status: true,
          message: "Error in creating center"
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
    await setFormData((prevState) => ({
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
          <FormAlert alertState={alertState}/>
          
          <Typography component="h1" variant="h5">
            Create a new center
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
                  name="contactNum"
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
