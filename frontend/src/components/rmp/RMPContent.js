import React, { useEffect, useCallback } from "react";
import { Grid, Box, Avatar, Text } from "grommet";
import { Scrollbar } from "react-scrollbars-custom";
import { getProfilePic } from "../common/profilePics";
import useReviews from "./useReviews";
import Spinner from "../common/Spinner";

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
    if (error) console.error(error);
  }, [error]);

  if (isLoading) return <Spinner />;
  if (error) return <p>errrr</p>;
  return (
    <Box
      background="#FFFFFF"
      round={{ size: "xsmall", corner: "bottom-right" }}
      style={{ overflowY: "auto" }}
    >
      <Scrollbar ref={scrollRef}>
        {reviews?.length !== 0 ? (
          reviews.map((review, index) => (
            <Grid
              rows={["flex"]}
              columns={["80px", "flex"]}
              areas={[
                { name: "Icon", start: [0, 0], end: [0, 0] },
                { name: "Review", start: [1, 0], end: [1, 0] },
              ]}
              key={index}
              fill="vertical"
            >
              <Box gridArea="Icon" margin="small" align="end" justify="end">
                <Avatar size="medium" src={getProfilePic()} />
              </Box>

              <Box
                gridArea="Review"
                round="xsmall"
                margin="small"
                background="#EFEFEF"
                pad="small"
              >
                <Text textAlign="end" margin={{ bottom: "10px" }}>
                  {review.rDate}
                </Text>
                <Text
                  textAlign="start"
                  margin={{ bottom: "10px" }}
                >{`${review.rClass} | Quality: ${review.rOverall} | Difficulty: ${review.rEasy}`}</Text>
                <Text textAlign="start" margin={{ bottom: "10px" }}>
                  {review.rComments}
                </Text>
                <Text textAlign="start">
                  {review.teacherRatingTags.length !== 0 && "Tags: "}
                  {review.teacherRatingTags.map((tag) => `${tag} | `)}
                </Text>
              </Box>
            </Grid>
          ))
        ) : (
          <p>No reviews found for this course and instructor</p>
        )}
      </Scrollbar>
    </Box>
  );
};

export default RMPContent;
