import React, { useEffect } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { Grid, Box, Avatar } from "grommet";
import { getProfilePic } from "../common/profilePics";
import Spinner from "../common/Spinner";
import useInstructorSummary from "./useInstructorSummary";

const RMPSidebar = ({ course, selectedInstructor, setSelectedInstructor }) => {
  // TODO: the component should probably have the isLoading control
  const [instructorInfos, isLoading, error] = useInstructorSummary(course);

  useEffect(() => {
    if (error) console.error("123123", error);
  }, [error]);

  // set the first instructor as the highlighted one
  useEffect(() => {
    if (instructorInfos) setSelectedInstructor(instructorInfos[0]);
  }, [instructorInfos, setSelectedInstructor]);

  if (isLoading) return <Spinner />;
  return (
    <Box
      style={{ overflowY: "auto" }}
      background="light-1"
      round={{ size: "xsmall", corner: "bottom-left" }}
    >
      <Scrollbar>
        {instructorInfos &&
          instructorInfos.map((instructorInfo, index) => (
            <Box
              onClick={() => setSelectedInstructor(instructorInfo)}
              background={
                selectedInstructor.instructor === instructorInfo.instructor
                  ? "neutral-3"
                  : "light-3"
              }
              margin="small"
              round="xsmall"
              key={index}
            >
              <Grid
                rows={["80px"]}
                columns={["80px", "flex"]}
                areas={[
                  { name: "Icon", start: [0, 0], end: [0, 0] },
                  { name: "Desc", start: [1, 0], end: [1, 0] },
                ]}
                fill="vertical"
              >
                <Box
                  gridArea="Icon"
                  justify="center"
                  align="center"
                  round={{ size: "xsmall", corner: "left" }}
                >
                  <Avatar size="medium" src={getProfilePic(index)} />
                </Box>
                <Box
                  gridArea="Desc"
                  justify="center"
                  align="start"
                  pad="small"
                  round={{ size: "xsmall", corner: "right" }}
                >
                  <span style={{ textTransform: "capitalize" }}>
                    {instructorInfo.instructor.toLowerCase()}
                  </span>
                </Box>
              </Grid>
            </Box>
          ))}
      </Scrollbar>
    </Box>
  );
};

export default RMPSidebar;
