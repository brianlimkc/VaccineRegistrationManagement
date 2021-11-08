
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CreateCenter from "./CreateCenter";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import ShowCenters from "./ShowCenters";
import Typography from "@mui/material/Typography";
import axios from "axios";

function Center() {
  const [centerArray, setCenterArray] = useState();

  useEffect(() => {
    getAllCenters();
  }, []);

  async function getAllCenters() {
    try {
      let {
        data: { centerArray },
      } = await axios.get("/api/center/showall", {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      });
      setCenterArray(centerArray);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container component="main">
      <Box
        sx={{
          display: "flex",
          mt: 2,
          mb: 2,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 1,
        }}
      >
        <Typography component="h1" variant="h4">
          Manage Centers
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CreateCenter getAllCenters={getAllCenters} />
        </Grid>

        <Grid item xs={6}>
          <ShowCenters
            centerArray={centerArray}
            getAllCenters={getAllCenters}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Center;
