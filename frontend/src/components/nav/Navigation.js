import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";

function Navigation({ auth, user, logout }) {
  let history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function menuLogout() {
    logout();
    handleClose();
    history.push("/");
  }

  return (
    <div>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Vaccine Registration Management
          </Typography>

          <nav>
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
                  id="profileLink"
                  onClick={() => history.push("/profile")}
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Manage Profile
                </Link>

                {(user.isStaff) ?
                <>
                  <Link
                    variant="button"
                    color="text.primary"
                    onClick={() => history.push("/roster")}
                    sx={{ my: 1, mx: 1.5 }}
                    id="manageRoster"
                  >
                    Manage Roster
                  </Link>
                </>
                : <></> }

                {user.isAdmin ? (
                  <>
                    <Link
                      variant="button"
                      color="text.primary"
                      onClick={() => history.push("/admin/user")}
                      sx={{ my: 1, mx: 1.5 }}
                      id="manageUser"
                    >
                      Manage Users
                    </Link>

                    <Link
                      variant="button"
                      color="text.primary"
                      onClick={() => history.push("/admin/center")}
                      sx={{ my: 1, mx: 1.5 }}
                      id="manageCenter"
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
                  href="/register"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Register Account
                </Link>
              </>
            )}

            {auth ? (
              <>
                <Button
                  variant="outlined"
                  sx={{ my: 1, mx: 1.5 }}
                  onClick={handleClick}
                  id="menuButton"
                >
                  Menu
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {/* <MenuItem onClick={visitProfile}>Profile</MenuItem> */}
                  {/* <MenuItem onClick={visitAdmin}>Admin</MenuItem> */}
                  <MenuItem id="logoutButton" onClick={menuLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  href="/login"
                  variant="outlined"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Login
                </Button>
              </>
            )}
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation;
