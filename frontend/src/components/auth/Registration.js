import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormAlert from "../common/FormAlert";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { checkForm } from "../common/checkForm";
import { useHistory } from "react-router-dom";

function Registration({ setAuth, setUser }) {

  let history = useHistory();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nric: "",
    password: "",
    password2: "",
    dateOfBirth: "",
    contactNum: "",
  });
  const [docSwitch, setDocSwitch] = useState(false);
  const [staffTypeState, setStaffTypeState] = useState("");
  const [qualificationTypeState, setQualificationTypeState] = useState("");
  
  const [alertState, setAlertState] = useState({
    type: "error",
    status: false,
    message: "",
  });
  
  const [errorState, setErrorState] = useState({
    nameValid: false,
    nameMsg: "",
    emailValid: false,
    emailMsg: "",
    nricValid: false,
    nricMsg: "",
    passwordValid: false,
    passwordMsg: "",
    password2Valid: false,
    password2Msg: "",
    contactValid: false,
    contactMsg: "",
    dobValid: false,
    dobMsg: "",
    staffValid: false,
    staffMsg: "",
    qualValid: false,
    qualMsg: "",
  });

  async function submit(e) {
    e.preventDefault();

    if (checkForm(formData,setErrorState,setAlertState)) {
      try {
        let {
          data: { user, token },
        } = await axios.post("/api/auth/register", formData);
        localStorage.setItem("token", token);
        setAuth(true);
        setUser(user);
        setAlertState({
          type: "success",
          status: true,
          message: "Registration Successful",
        });

        setTimeout(() => {
          go("/login");
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

  function go(address) {
    history.push(address);
  }

  function change(e) {
    if (e.target.name === "nric") {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value.toUpperCase(),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  }

  function docSwitchToggle(e) {
    setDocSwitch(e.target.checked);
    if (e.target.checked) {
      setFormData((prevState) => ({
        ...prevState,
        staffType: staffTypeState,
        qualificationType: qualificationTypeState,
      }));
    } else if (!e.target.checked) {
      setFormData((prevState) => ({
        ...prevState,
        staffType: "",
        qualificationType: "",
      }));
    }
    setFormData((prevState) => ({
      ...prevState,
      isStaff: e.target.checked,
    }));
  }

  function handleStaffToggle(e) {
    setStaffTypeState(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      staffType: e.target.value,
    }));
  }

  function handleQualificationToggle(e) {
    setQualificationTypeState(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      qualificationType: e.target.value,
    }));
  }

  return (
    <Container component="main" maxWidth="xs">
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
            Sign up for a new account
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
                  label="Full Name"
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
                  id="nric"
                  label="NRIC Number"
                  name="nric"
                  onChange={change}
                  error={errorState.nricValid}
                  helperText={errorState.nricMsg}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={change}
                  error={errorState.emailValid}
                  helperText={errorState.emailMsg}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={change}
                  error={errorState.passwordValid}
                  helperText={errorState.passwordMsg}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Retype Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  onChange={change}
                  error={errorState.password2Valid}
                  helperText={errorState.password2Msg}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="contactNum"
                  label="Contact Number"
                  name="contactNum"
                  autoComplete="contact"
                  onChange={change}
                  error={errorState.contactValid}
                  helperText={errorState.contactMsg}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="date"
                  label="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={change}
                  error={errorState.dobValid}
                  helperText={errorState.dobMsg}
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="docReg"
                        checked={docSwitch}
                        onChange={docSwitchToggle}
                      />
                    }
                    label="Register as a Doctor"
                  />
                </FormGroup>
              </Grid>

              {docSwitch ? (
                <>
                  <Grid item xs={6}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                      error={errorState.staffValid}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Staff Type
                      </InputLabel>
                      <Select
                        id="staffType"
                        name="staffType"
                        value={staffTypeState}
                        onChange={handleStaffToggle}
                        label="Staff Type"
                      >
                        <MenuItem value={"Doctor"}>Doctor</MenuItem>
                        <MenuItem value={"Nurse"}>Nurse</MenuItem>
                        <MenuItem value={"Staff"}>Staff</MenuItem>
                      </Select>
                      <FormHelperText>{errorState.staffMsg}</FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                      error={errorState.qualValid}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Qualification
                      </InputLabel>
                      <Select
                        id="qualificationType"
                        name="qualificationType"
                        value={qualificationTypeState}
                        onChange={handleQualificationToggle}
                        label="Qualification Type"
                      >
                        <MenuItem value={"MD"}>MD</MenuItem>
                        <MenuItem value={"BS Nursing"}>BS Nursing</MenuItem>
                        <MenuItem value={"Dip Nursing"}>Dip Nursing</MenuItem>
                        <MenuItem value={""}>N.A.</MenuItem>
                      </Select>
                      <FormHelperText>{errorState.qualMsg}</FormHelperText>
                    </FormControl>
                  </Grid>
                </>
              ) : (
                <></>
              )}
            </Grid>

            <Button
              id="submit"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}

export default Registration;
