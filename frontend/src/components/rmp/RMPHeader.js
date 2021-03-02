import React from "react";
import { Box } from "grommet";

const RMPHeader = () => {
  return (
    <Box
      background="#FFFFFF"
      gridArea="Header"
      round={{ size: "xsmall", corner: "top" }}
      border={{side: "bottom", size: "small"}}
      justify="center"
    >
      Rate My Professor
    </Box>
  );
};

export default RMPHeader