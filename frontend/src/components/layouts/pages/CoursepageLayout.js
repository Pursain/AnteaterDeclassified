import React from "react";

import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";

import { Grommet } from "grommet";
import { ResponsiveGrid } from "../Responsive/ResponsiveGrid";

const customBreakpoints = deepMerge(grommet, {
  global: {
    breakpoints: {
      small: {
        value: 900,
      },
      medium: {
        value: 1600,
      },
      large: {
        value: 2500,
      },
      xlarge: {
        value: 4000,
      },
    },
  },
});

const columns = {
  small: ["flex"],
  medium: ["large"],
  large: ["large", "flex"],
  xlarge: ["large", "xxlarge"],
};

const rows = {
  small: ["medium", "large", "large"],
  medium: ["medium", "large", "large"],
  large: ["medium", "flex"],
  xlarge: ["medium", "flex"],
};

const fixedGridAreas = {
  small: [
    { name: "Summary", start: [0, 0], end: [0, 0] },
    { name: "RMP", start: [0, 1], end: [0, 1] },
    { name: "Analytics", start: [0, 2], end: [0, 2] },
  ],
  medium: [
    { name: "Summary", start: [0, 0], end: [0, 0] },
    { name: "RMP", start: [0, 1], end: [0, 1] },
    { name: "Analytics", start: [0, 2], end: [0, 2] },
  ],
  large: [
    { name: "Summary", start: [0, 0], end: [0, 0] },
    { name: "RMP", start: [0, 1], end: [0, 1] },
    { name: "Analytics", start: [1, 0], end: [1, 1] },
  ],
  xlarge: [
    { name: "Summary", start: [0, 0], end: [0, 0] },
    { name: "RMP", start: [0, 1], end: [0, 1] },
    { name: "Analytics", start: [1, 0], end: [1, 1] },
  ],
};

export const CoursepageLayout = ({ children }) => (
  <Grommet theme={customBreakpoints} full={true}>
    <ResponsiveGrid
      rows={rows}
      columns={columns}
      areas={fixedGridAreas}
      gap="large"
      pad="large"
      fill="vertical"
      justifyContent="center"
      style={{
        background: "#D0E9FF",
      }}
    >
      {children}
    </ResponsiveGrid>
  </Grommet>
);
