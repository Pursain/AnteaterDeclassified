import React from "react";
import { Box } from "grommet";
import { CoursepageLayout } from "../layouts/pages/CoursepageLayout";
import { useParams } from "react-router-dom";
import { RMP } from "../rmp/RMP";
import { CourseSummaryContainer } from "../courseSummary/CourseSummaryContainer";
import { AnalyticsContainer } from "../analytics/AnalyticsContainer";

export const Coursepage = () => {
  let { course } = useParams();
  course = decodeURIComponent(course);
  return (
    <CoursepageLayout>
      <Box
        background="light-5"
        gridArea="Summary"
        animation={["zoomIn", "fadeIn"]}
        round="xsmall"
        elevation="xlarge"
      >
        <CourseSummaryContainer course={course} />
      </Box>

      <Box
        background="light-2"
        gridArea="Analytics"
        animation={["zoomIn", "fadeIn"]}
        round="xsmall"
        elevation="xlarge"
      >
        <AnalyticsContainer course={course} />
      </Box>

      <Box
        background="light-2"
        gridArea="RMP"
        animation={["zoomIn", "fadeIn"]}
        round="xsmall"
        elevation="xlarge"
      >
        <RMP course={course} />
      </Box>
    </CoursepageLayout>
  );
};
