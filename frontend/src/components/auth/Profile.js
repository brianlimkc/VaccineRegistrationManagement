import React, { useState } from "react";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert";

function Profile({ setAuth, user, setUser }) {
  const [editState, setEditState] = useState(false);
  const [alertState2, setAlertState2] = useState({
    type: "error",
    status: false,
    message: "",
  });

  let history = useHistory();

  function logout() {
    setAlertState2({
      type: "success",
      status: true,
      message: "User logged out successfully",
    });
    setTimeout(goLogin, 1250);
  }

  async function deleteAcct() {
    try {
      await axios.delete(
        "/api/auth/delete",
        {
          headers: {
            authorization: `Bearer ${localStorage.token}`,
          },
        },
        user
      );

      setAlertState2({
        type: "success",
        status: true,
        message: "User has been deleted",
      });
      setTimeout(() => {
        goLogin();
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  }

  function goLogin() {
    setAuth(false);
    setUser(null);
    localStorage.removeItem("token");
    history.push("/login");
  }

  return (
    <Container component="main" maxWidth="md">
      <Grid className={"d-flex justify-content-center mt-3"}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {alertState2.status ? (
            <Alert id="alert" severity={alertState2.type}>
              {alertState2.message}
            </Alert>
          ) : (
            <></>
          )}

          {!editState ? (
            <ShowProfile user={user} />
          ) : (
            <EditProfile
              setEditState={setEditState}
              setAuth={setAuth}
              user={user}
              setUser={setUser}
            />
          )}
        </Box>
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{ margin: 1 }}
            variant="contained"
            id="editProfile"
            onClick={() => setEditState(true)}
          >
            Edit Profile
          </Button>
          <Button
            sx={{ margin: 1 }}
            variant="contained"
            id="logoutProfile"
            onClick={logout}
          >
            Log Out
          </Button>
          <Button
            sx={{ margin: 1 }}
            variant="contained"
            id="deleteProfile"
            onClick={deleteAcct}
          >
            Delete Profile
          </Button>
        </Box>
      </Grid>
    </Container>
  );
}

export default Profile;
