import React, { useState, useEffect } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { Grid, Box, Avatar } from "grommet";
import { getProfilePic } from "../common/profilePics";
import axios from "axios";

const RMPSidebar = ({ course, selectedInstructor, setSelectedInstructor }) => {
  const [instructorInfos, setInstructorInfos] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/InstructorSummary`, {
        params: {
          course: course,
        },
      })
      .then((result) => {
        setSelectedInstructor(result.data[0]);
        setInstructorInfos(result.data);
      });
  }, [course, setSelectedInstructor]);

  return (
    <Box
      style={{ overflowY: "auto" }}
      background="light-1"
      round={{ size: "xsmall", corner: "bottom-left" }}
    >
      <Scrollbar>
        {instructorInfos
          ? instructorInfos.map((instructorInfo, index) => (
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
            ))
          : "loading"}
      </Scrollbar>
    </Box>
  );
};

export default RMPSidebar;
