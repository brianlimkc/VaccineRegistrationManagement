import React from "react";
import Box from "@mui/material/Box";
import {
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useHistory } from "react-router-dom";

function ShowRooms({ centerID, roomArray, getRoomArray }) {
  let history = useHistory();
  let tempArray = [];

  if (roomArray != null) {
    tempArray = [...roomArray];
  }

  function showRoom(id) {
    history.push(`/admin/showroom/${id}`);
  }

  return (
    <Container component="main">
      <Grid>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            List of all Rooms
          </Typography>

          <TableContainer
            sx={{
              height: 800,
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Room Name</TableCell>
                <TableCell>View Room</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tempArray.length > 0 ? (
                <>
                  {tempArray.map((room, id) => (
                    <TableRow key={id}>
                      <TableCell>{room.name}</TableCell>
                      <TableCell>
                        <Button
                          id={`${room.name} button`}
                          variant="contained"
                          size="small"
                          onClick={() => showRoom(room._id)}
                        >
                          View Room
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <></>
              )}
            </TableBody>
          </TableContainer>
        </Box>
      </Grid>
    </Container>
  );
}

export default ShowRooms;
