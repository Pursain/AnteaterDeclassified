import React, { useState } from "react";
import { Grid } from "grommet";
import RMPSidebar from "./RMPSidebar";
import RMPContent from "./RMPContent";
import RMPHeader from "./RMPHeader";

const RMPContainer = ({ course }) => {
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  return (
    // TODO responsive Grid
    <Grid
      rows={["xxsmall", "flex"]}
      columns={["300px", "flex"]}
      areas={[
        { name: "Header", start: [0, 0], end: [1, 0] },
        { name: "Sidebar", start: [0, 1], end: [0, 1] },
        { name: "Content", start: [1, 1], end: [1, 1] },
      ]}
      fill="vertical"
    >
      <RMPHeader gridArea="Header" />

      <RMPSidebar
        gridArea="Sidebar"
        course={course}
        selectedInstructor={selectedInstructor}
        setSelectedInstructor={setSelectedInstructor}
      />

      <RMPContent
        gridArea="Content"
        course={course}
        selectedInstructor={selectedInstructor}
      />
    </Grid>
  );
};

export default RMPContainer;
