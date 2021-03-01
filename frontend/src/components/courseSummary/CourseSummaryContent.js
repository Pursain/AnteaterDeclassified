import React, { useEffect } from "react";
import { Box, Tip } from "grommet";
import useCourseSummary from "./useCourseSummary";

import { HoverText, Pill } from "../common/common";

export const CourseSummaryContent = ({ course }) => {
  const [courseData, isLoading, error] = useCourseSummary(course);

  // TODO: can do better
  useEffect(() => {
    console.error(error);
  }, [error]);

  console.log(courseData);

  // TODO: add spinner or something
  if (isLoading) return <p>loading</p>;

  return (
    <Box
      background="#F5F5F5"
      gridArea="Content"
      round={{ size: "xsmall", corner: "bottom" }}
      pad="medium"
      style={{ display: "flex", flexFlow: "column", alignItems: "flex-start" }}
    >
      <p
        style={{
          textAlign: "start",
          fontSize: "72px",
          lineHeight: "64px",
          margin: "8px",
        }}
      >
        {course}
      </p>
      {courseData?.title && (
        <p
          style={{
            textAlign: "start",
            fontSize: "36px",
            lineHeight: "36px",
            margin: "8px",
            color: "#FFD1D1",
          }}
        >
          {courseData.title}
        </p>
      )}
      {courseData?.desc && (
        <p
          style={{
            textAlign: "start",
            fontSize: "14px",
            lineHeight: "14px",
            margin: "8px",
          }}
        >
          {courseData.desc}
        </p>
      )}
      <div>
        {courseData?.breadthCodeStr && (
          <Tip plain content={<HoverText>{courseData.breadthCodeStr}</HoverText>}>
            <Pill>Breadth Code</Pill>
          </Tip>
        )}
        {courseData?.concurrentWithStr && (
          <Tip plain content={<HoverText>{courseData.concurrentWithStr}</HoverText>}>
            <Pill>Concurrent</Pill>
          </Tip>
        )}
        {courseData?.coreqStr && (
          <Tip plain content={<HoverText>{courseData.coreqStr}</HoverText>}>
            <Pill>Corequiste</Pill>
          </Tip>
        )}
        {courseData?.designUnitsStr && (
          <Tip plain content={<HoverText>{courseData.designUnitsStr}</HoverText>}>
            <Pill>Design Units</Pill>
          </Tip>
        )}
        {courseData?.gradeOptionStr && (
          <Tip plain content={<HoverText>{courseData.gradeOptionStr}</HoverText>}>
            <Pill>Grade Option</Pill>
          </Tip>
        )}
        {courseData?.overlapsWithStr && (
          <Tip plain content={<HoverText>{courseData.overlapsWithStr}</HoverText>}>
            <Pill>Overlaps</Pill>
          </Tip>
        )}
        {courseData?.prereqStr && (
          <Tip plain content={<HoverText>{courseData.prereqStr}</HoverText>}>
            <Pill>Prerequistes</Pill>
          </Tip>
        )}
        {courseData?.repeatStr && (
          <Tip plain content={<HoverText>{courseData.repeatStr}</HoverText>}>
            <Pill>Repeat</Pill>
          </Tip>
        )}
        {courseData?.restrictStr && (
          <Tip plain content={<HoverText>{courseData.restrictStr}</HoverText>}>
            <Pill>Restrictions</Pill>
          </Tip>
        )}
        {courseData?.sameAsStr && (
          <Tip plain content={<HoverText>{courseData.sameAsStr}</HoverText>}>
            <Pill>Same as</Pill>
          </Tip>
        )}
      </div>
    </Box>
  );
};
