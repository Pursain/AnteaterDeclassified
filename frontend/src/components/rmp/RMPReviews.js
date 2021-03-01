import React, { useEffect, useState, useRef } from "react";
import { Grid, Box, Avatar, Text } from "grommet";
import { Scrollbar } from "react-scrollbars-custom";
import Cat from "../../assests/cat.png";
import axios from "axios";

export const RMPReviews = ({ course, selectedInstructor }) => {
  const scrollRef = useRef();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    if (selectedInstructor) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/RMPSummary`, {
          params: {
            course: course,
            instructor: selectedInstructor.instructor,
          },
        })
        .then((result) => {
          setReviews(result.data.ratings.reverse());
        });
    }
  }, [course, selectedInstructor, setReviews]);

  // scroll to bottom
  useEffect(() => {
    if (scrollRef) scrollRef.current.scrollToBottom();
  }, [reviews, scrollRef]);

  return (
    <Box
      background="light-3"
      round={{ size: "xsmall", corner: "bottom-right" }}
      style={{ overflowY: "auto" }}
    >
      <Scrollbar ref={scrollRef}>
        {reviews &&
          reviews.map((review, index) => (
            <Grid
              rows={["flex"]}
              columns={["80px", "flex"]}
              areas={[
                { name: "Icon", start: [0, 0], end: [0, 0] },
                { name: "Review", start: [1, 0], end: [1, 0] },
              ]}
              key={index}
            >
              <Box gridArea="Icon" margin="small" align="center" justify="end">
                <Avatar size="medium" src={Cat} />
              </Box>

              <Box
                gridArea="Review"
                round="xsmall"
                margin="small"
                background="light-4"
                pad="small"
              >
                <Text textAlign="end">{review.rDate}</Text>
                <Text textAlign="start">{review.rComments}</Text>
              </Box>
            </Grid>
          ))}
      </Scrollbar>
    </Box>
  );
};
