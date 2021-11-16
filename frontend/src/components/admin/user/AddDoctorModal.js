import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import React, { useState } from "react";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { checkForm } from "../../common/checkForm";
import FormAlert from "../../common/FormAlert";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 600,
  bgcolor: "white",
  border: "2px solid #000",
  p: 2,
  px: 4,
  pb: 3,
};

function AddDoctorModal({open,setOpen}){

    const handleClose = () => setOpen(false);
  const [staffTypeState, setStaffTypeState] = useState("");
  const [qualificationTypeState, setQualificationTypeState] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nric: "",
    password: "",
    password2: "",
    dateOfBirth: "",
    contactNum: "",
    staffType: "",
    qualificationType: "",
    isStaff: true,
  });

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
        await axios.post("/api/auth/register", formData);

        setAlertState({
          type: "success",
          status: true,
          message: "New Doctor Added Successfully",
        });

        setTimeout(() => {
          closeModal();
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

  function closeModal() {
    setAlertState({
      type: "error",
      status: false,
      message: "",
    });
    setFormData({
      name: "",
      email: "",
      nric: "",
      password: "",
      password2: "",
      dateOfBirth: "",
      contactNum: "",
      staffType: "",
      qualificationType: "",
      isStaff: true,
    });
    setErrorState({
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
    handleClose();
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
        <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <Container component="main" maxWidth="xs">
            <Grid className={"d-flex justify-content-center mt-3"}>
              <Box
                sx={{
                  marginTop: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FormAlert alertState={alertState}/>

                <Typography component="h1" variant="h5">
                  Add a new Doctor
                </Typography>

                <Box
                  component="form"
                  noValidate
                  onSubmit={submit}
                  sx={{ mt: 3 }}
                >
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
                      id="submit"
                      type="submit"
                      variant="contained"
                      sx={{ margin: 1 }}
                    >
                      Add Doctor
                    </Button>
                    <Button
                      onClick={() => closeModal()}
                      variant="contained"
                      sx={{ margin: 1 }}
                      id="close"
                    >
                      Close
                    </Button>
                  </Box>

                  <Grid container justifyContent="flex-end">
                    <Grid item></Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Container>
        </Box>
      </StyledModal>
    )

}

export default AddDoctorModal;
