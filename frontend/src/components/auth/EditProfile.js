import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import { checkForm } from "../common/checkForm";
import FormAlert from "../common/FormAlert";

function EditProfile({ user, setUser, setEditState }) {
  const [formData, setFormData] = useState({
    id: user._id,
    name: user.name,
    email: user.email,
    contactNum: user.contactNum,
    password: "",
    password2: ""
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
    passwordValid: false,
    passwordMsg: "",
    password2Valid: false,
    password2Msg: "",
    contactValid: false,
    contactMsg: "",
  });

  async function submit(e) {
    e.preventDefault();
    if (checkForm(formData,setErrorState,setAlertState)) {
      try {
        let {
          data: { user },
        } = await axios.post("/api/auth/update", formData, {
          headers: {
            authorization: `Bearer ${localStorage.token}`,
          },
        });

        setUser(user);
        setAlertState({
          type: "success",
          status: true,
          message: "Account successfully updated!",
        });
        setTimeout(goBack, 1250);
      } catch (e) {
        console.log(e);
        setAlertState({
          type: "error",
          status: true,
          message: "Error in updating account!",
        });
      }
    }
  }

  function goBack() {
    setEditState(false);
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

  // function checkForm() {
  //   let validForm = true;
  //   let tempFormData = formData;

  //   if (tempFormData.name === "") {
  //     setErrorState((prevState) => ({
  //       ...prevState,
  //       nameValid: true,
  //       nameMsg: "Please enter a name",
  //     }));
  //     validForm = false;
  //   } else {
  //     setErrorState((prevState) => ({
  //       ...prevState,
  //       nameValid: false,
  //       nameMsg: "",
  //     }));
  //   }

  //   if (tempFormData.email === "" || !emailCheck(tempFormData.email)) {
  //     setErrorState((prevState) => ({
  //       ...prevState,
  //       emailValid: true,
  //       emailMsg: "Please enter a valid email",
  //     }));
  //     validForm = false;
  //   } else {
  //     setErrorState((prevState) => ({
  //       ...prevState,
  //       emailValid: false,
  //       emailMsg: "",
  //     }));
  //   }

  //   if (tempFormData.password !== "" && tempFormData.password !== "") {
  //     if (!passwordCheck(tempFormData.password)) {
  //       setErrorState((prevState) => ({
  //         ...prevState,
  //         passwordValid: true,
  //         passwordMsg:
  //           "Please enter a valid password (1 lowercase char, 1 uppercase char, 1 number, at least 8 chars)",
  //       }));
  //       validForm = false;
  //     } else {
  //       setErrorState((prevState) => ({
  //         ...prevState,
  //         passwordValid: false,
  //         passwordMsg: "",
  //       }));
  //     }

  //     if (tempFormData.password !== tempFormData.password2) {
  //       setErrorState((prevState) => ({
  //         ...prevState,
  //         password2Valid: true,
  //         password2Msg: "Passwords do not match. Please check and type again",
  //       }));
  //       validForm = false;
  //     } else {
  //       setErrorState((prevState) => ({
  //         ...prevState,
  //         password2Valid: false,
  //         password2Msg: "",
  //       }));
  //     }
  //   }

  //   if (!contactCheck(tempFormData.contactNum)) {
  //     setErrorState((prevState) => ({
  //       ...prevState,
  //       contactValid: true,
  //       contactMsg: "Please enter a valid contact number",
  //     }));
  //     validForm = false;
  //   } else {
  //     setErrorState((prevState) => ({
  //       ...prevState,
  //       contactValid: false,
  //       contactMsg: "",
  //     }));
  //   }

  //   if (!validForm) {
  //     setAlertState({
  //       type: "error",
  //       status: true,
  //       message: "Error in form, please check!",
  //     });
  //   } else {
  //     setAlertState({
  //       type: "",
  //       status: false,
  //       message: "",
  //     });
  //   }

  //   return validForm;
  // }

  // function emailCheck(email) {
  //   const regexp =
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return regexp.test(email);
  // }

  // function passwordCheck(password) {
  //   const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  //   return regexp.test(password);
  // }

  // function contactCheck(contact) {
  //   const regexp = /^(?=.*[0-9])(?=.{8,})/;
  //   return regexp.test(contact);
  // }

  return (
    <Container component="main" maxWidth="xs">
      <Grid className={"d-flex justify-content-center "}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormAlert alertState={alertState}/>

          <Typography component="h1" variant="h4">
            Edit Account Details
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
                  defaultValue={user.name}
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
                  id="email"
                  label="Email Address"
                  defaultValue={user.email}
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
                  label="Password2"
                  type="password"
                  id="password2"
                  autoComplete="new-password2"
                  onChange={change}
                  error={errorState.password2Valid}
                  helperText={errorState.password2Msg}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contactNum"
                  label="Contact Number"
                  defaultValue={user.contactNum}
                  name="contactNum"
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
                type="submit"
                id="submitChange"
                variant="contained"
                sx={{ margin: 1 }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                sx={{ margin: 1 }}
                onClick={() => setEditState(false)}
                id="goBack"
              >
                Go Back
              </Button>
            </Box>

            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}

export default EditProfile;
