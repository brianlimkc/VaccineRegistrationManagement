import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useHistory } from "react-router-dom";
import { useTitle } from "react-use";

function LandingPage({ auth, user }) {
  let history = useHistory();
  useTitle("Home Screen");

  return (
    <Container component="main" maxWidth="md">
      <Grid className={"d-flex justify-content-center mt-3"}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          <Typography component="h1" variant="h5">
            Please select an option below:
          </Typography>

          {auth && user ? (
            <>
              {!user.isStaff && !user.isAdmin ? (
                <>
                  <Link
                    variant="button"
                    color="text.primary"
                    href="/bookAppt"
                    sx={{ my: 1, mx: 1.5 }}
                  >
                    Book Appt
                  </Link>
                </>
              ) : (
                <></>
              )}

              <Link
                variant="button"
                color="text.primary"
                onClick={() => history.push("/profile")}
                sx={{ my: 1, mx: 1.5 }}
                id="profileLink"
              >
                Manage Profile
              </Link>

              {user.isStaff ? (
                <Link
                  variant="button"
                  color="text.primary"
                  onClick={() => history.push("/roster")}
                  sx={{ my: 1, mx: 1.5 }}
                  id="profileLink"
                >
                  Manage Roster
                </Link>
              ) : (
                <></>
              )}

              {user.isAdmin ? (
                <>
                  <Link
                    variant="button"
                    color="text.primary"
                    onClick={() => history.push("/admin/user")}
                    sx={{ my: 1, mx: 1.5 }}
                  >
                    Manage Users
                  </Link>

                  <Link
                    variant="button"
                    color="text.primary"
                    onClick={() => history.push("/admin/center")}
                    sx={{ my: 1, mx: 1.5 }}
                  >
                    Manage Centers
                  </Link>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <Link
                variant="button"
                color="text.primary"
                href="/login"
                sx={{ my: 1, mx: 1.5 }}
              >
                Login
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="/register"
                sx={{ my: 1, mx: 1.5 }}
              >
                Register Account
              </Link>
            </>
          )}
        </Box>
      </Grid>
    </Container>
  );
}

export default LandingPage;
