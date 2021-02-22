import React, { useState } from "react";
import { Grid, Box } from "grommet";
import { CourseSummaryContent } from "./CourseSummaryContent";

export const CourseSummary = ({ course }) => {
  return (
    // TODO responsive Grid
    <Grid
      rows={["xxsmall", "flex"]}
      columns={["flex"]}
      areas={[
        { name: "Header", start: [0, 0], end: [0, 0] },
        { name: "Content", start: [0, 1], end: [0, 1] },
      ]}
      fill="vertical"
    >
      <Box
        background="light-5"
        gridArea="Header"
        round={{ size: "small", corner: "top" }}
      >
        Header
      </Box>

      <CourseSummaryContent gridArea="Content" course={course} />
    </Grid>
  );
};
