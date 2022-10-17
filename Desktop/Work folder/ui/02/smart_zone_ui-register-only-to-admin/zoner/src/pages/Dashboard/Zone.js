import React from "react";

// Local
import Header from "../Shared/Header";

// MUI
import { Box } from "@mui/system";

const Zone = () => {
  const canvas = document.getElementById("drawing-board");
//   const ctx = canvas.getContext("2d");
//   console.log("ctx: ", ctx);
  return (
    <>
      <Header />
      <section className="container">
        <Box className="drawing-board">
          <canvas id="drawing-board"></canvas>
        </Box>
      </section>
    </>
  );
};

export default Zone;
