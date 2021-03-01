import React from "react";
import { Box } from "grommet";

export const CourseSummaryHeader = () => {
  return (
    <Box
      background="#FFFFFF"
      gridArea="Header"
      round={{ size: "xsmall", corner: "top" }}
      border={{side: "bottom", size: "small"}}
      justify="center"
    >
      Course Summary
    </Box>
  );
};
