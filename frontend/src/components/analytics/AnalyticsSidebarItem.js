import React from "react";
import { Box, Grid, Avatar } from "grommet";
import { Cat } from "../common/profilePics";

const AnalyticsSidebarItem = ({ text, active, onClick }) => {
  return (
    <Box
      onClick={onClick}
      background={!active ? "" : "light-3"}
      margin="small"
      round="xsmall"
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
          <Avatar size="medium" src={Cat} />
        </Box>
        <Box
          gridArea="Desc"
          justify="center"
          align="start"
          pad="small"
          round={{ size: "xsmall", corner: "right" }}
        >
          <span>{text}</span>
        </Box>
      </Grid>
    </Box>
  );
};

export default AnalyticsSidebarItem;
