import React, { useState, useEffect } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { Grid, Box, Avatar } from "grommet";
import Cat from "../../assests/cat.png";
import Dog from "../../assests/dog.png";
import axios from "axios";

export const RMPSidebar = ({
  course,
  selectedInstructor,
  setSelectedInstructor,
}) => {
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
      round={{ size: "small", corner: "bottom-left" }}
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
                round="small"
                key={index}
              >
                <Grid
                  rows={["80px"]}
                  columns={["80px", "flex"]}
                  areas={[
                    { name: "Icon", start: [0, 0], end: [0, 0] },
                    { name: "Desc", start: [1, 0], end: [1, 0] },
                  ]}
                >
                  <Box
                    gridArea="Icon"
                    justify="center"
                    align="center"
                    round={{ size: "small", corner: "left" }}
                  >
                    <Avatar size="medium" src={index % 2 ? Cat : Dog} />
                  </Box>
                  <Box
                    gridArea="Desc"
                    justify="center"
                    align="start"
                    pad="small"
                    round={{ size: "small", corner: "right" }}
                  >
                    {`${instructorInfo.instructor}`}
                  </Box>
                </Grid>
              </Box>
            ))
          : "loading"}
      </Scrollbar>
    </Box>
  );
};
