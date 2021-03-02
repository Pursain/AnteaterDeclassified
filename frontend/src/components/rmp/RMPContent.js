import React, { useEffect, useCallback } from "react";
import { Grid, Box, Avatar, Text } from "grommet";
import { Scrollbar } from "react-scrollbars-custom";
import Cat from "../../assests/cat.png";
import useReviews from "./useReviews";

const RMPContent = ({ course, selectedInstructor }) => {
  const [reviews, isLoading, error] = useReviews(course, selectedInstructor);

  // scroll to bottom on load
  const scrollRef = useCallback(
    (scrollbarNode) => {
      if (scrollbarNode && reviews) scrollbarNode.scrollToBottom();
    },
    [reviews]
  );

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  if (isLoading) return <p>Loading</p>;

  return (
    <Box
      background="#FFFFFF"
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
                background="#EFEFEF"
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

export default RMPContent;
