import React from "react";
import { Grid } from "grommet";
import { CourseSummaryContent } from "./CourseSummaryContent";
import { CourseSummaryHeader } from "./CourseSummaryHeader";

export const CourseSummaryContainer = ({ course }) => {
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
      <CourseSummaryHeader gridArea="Header" />

      <CourseSummaryContent gridArea="Content" course={course} />
    </Grid>
  );
};
