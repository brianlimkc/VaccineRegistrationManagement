import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormAlert from "../common/FormAlert";
import Grid from "@mui/material/Grid";
import ProfileForm from "./ProfileForm";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { checkForm } from "../common/checkForm";

function EditProfile({ user, setUser, setEditState }) {
  const [formData, setFormData] = useState({
    id: user._id,
    name: user.name,
    email: user.email,
    contactNum: user.contactNum,
    password: "",
    password2: "",
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
    if (checkForm(formData, setErrorState, setAlertState)) {
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
        setTimeout(() => setEditState(false), 1250);
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
          <FormAlert alertState={alertState} />

          <Typography component="h1" variant="h4">
            Edit Account Details
          </Typography>

          <ProfileForm
            formData={formData}
            setFormData={setFormData}
            errorState={errorState}
            submit={submit}
            addDocFlag={false}
            editFlag={true}
            setEditState={setEditState}
          />
        </Box>
      </Grid>
    </Container>
  );
}

export default EditProfile;
