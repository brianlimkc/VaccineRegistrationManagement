import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
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

  function checkForm() {
    let validForm = true;
    let tempFormData = formData;

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

    if (tempFormData.nric === "" || !nricCheck(tempFormData.nric)) {
      setErrorState((prevState) => ({
        ...prevState,
        nricValid: true,
        nricMsg: "Please enter a valid nric",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        nricValid: false,
        nricMsg: "",
      }));
    }

    if (tempFormData.email === "" || !emailCheck(tempFormData.email)) {
      setErrorState((prevState) => ({
        ...prevState,
        emailValid: true,
        emailMsg: "Please enter a valid email",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        emailValid: false,
        emailMsg: "",
      }));
    }

    if (tempFormData.password === "" || !passwordCheck(tempFormData.password)) {
      setErrorState((prevState) => ({
        ...prevState,
        passwordValid: true,
        passwordMsg:
          "Please enter a valid password (1 lowercase char, 1 uppercase char, 1 number, at least 8 chars)",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        passwordValid: false,
        passwordMsg: "",
      }));
    }

    if (
      tempFormData.password2 === "" ||
      tempFormData.password !== tempFormData.password2
    ) {
      setErrorState((prevState) => ({
        ...prevState,
        password2Valid: true,
        password2Msg: "Passwords do not match. Please check and type again",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        password2Valid: false,
        password2Msg: "",
      }));
    }

    if (!contactCheck(tempFormData.contactNum)) {
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

    if (
      tempFormData.dateOfBirth === "" ||
      !dateCheck(tempFormData.dateOfBirth)
    ) {
      setErrorState((prevState) => ({
        ...prevState,
        dobValid: true,
        dobMsg: "Please enter a valid date of birth (at least 12 years of age",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        dobValid: false,
        dobMsg: "",
      }));
    }

    if (tempFormData.isStaff && tempFormData.staffType === "") {
      setErrorState((prevState) => ({
        ...prevState,
        staffValid: true,
        staffMsg: "Please select staff type",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        staffValid: false,
        staffMsg: "",
      }));
    }

    if (tempFormData.isStaff && tempFormData.qualificationType === "") {
      setErrorState((prevState) => ({
        ...prevState,
        qualValid: true,
        qualMsg: "Please select qualification type",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        qualValid: false,
        qualMsg: "",
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

  function nricCheck(nric) {
    let validFirstChar = ["S", "T", "F", "G"];
    let nricWeight = [2, 7, 6, 5, 4, 3, 2];
    let nricCheckSum = 0;
    let stCheckChar = ["J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
    let fgCheckChar = ["X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K"];

    if (nric.length !== 9) {
      return false;
    }

    let firstChar = nric[0];
    let lastChar = nric[8];

    if (validFirstChar.indexOf(firstChar) === -1) {
      return false;
    }

    for (let i = 0; i < 7; i++) {
      nricCheckSum += parseInt(nric[i + 1]) * nricWeight[i];
    }

    if (firstChar === "T" || firstChar === "G") {
      nricCheckSum += 4;
    }

    nricCheckSum %= 11;

    if (
      validFirstChar.indexOf(firstChar) < 2 &&
      stCheckChar[nricCheckSum] === lastChar
    ) {
      return true;
    } else if (
      validFirstChar.indexOf(firstChar) > 1 &&
      fgCheckChar[nricCheckSum] === lastChar
    ) {
      return true;
    } else {
      return false;
    }
  }

  function emailCheck(email) {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  function passwordCheck(password) {
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return regexp.test(password);
  }

  function contactCheck(contact) {
    const regexp = /^(?=.*[0-9])(?=.{8,})/;
    return regexp.test(contact);
  }

  function dateCheck(date) {
    let dateTimeNow = Date.now();
    let ageGap = 86400000 * 365 * 12;

    if (Date.parse(date) > dateTimeNow - ageGap) {
      return false;
    } else {
      return true;
    }
  }

  async function submit(e) {
    e.preventDefault();

    if (checkForm()) {
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
          {alertState.status ? (
            <Alert id="alert" severity={alertState.type}>
              {alertState.message}
            </Alert>
          ) : (
            <></>
          )}

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
