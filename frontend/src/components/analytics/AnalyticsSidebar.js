import React from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { Box } from "grommet";
import { ANALYTICS_OPTIONS } from "./AnalyticsContent";
import AnalyticsSidebarItem from "./AnalyticsSidebarItem";

export const AnalyticsSidebar = ({
  selectedAnalytics,
  setSelectedAnalytics,
}) => {
  return (
    <Box
      style={{ overflowY: "auto" }}
      background="light-1"
      round={{ size: "xsmall", corner: "bottom-left" }}
    >
      <Scrollbar>
        <div
          style={{
            display: "flex",
            flexFlow: "column",
          }}
        >
          {Object.entries(ANALYTICS_OPTIONS).map(([key, option], index) => (
            <>
              <AnalyticsSidebarItem
                key={key}
                text={option}
                active={selectedAnalytics === option}
                onClick={() => setSelectedAnalytics(option)}
              />
              {index < Object.entries(ANALYTICS_OPTIONS).length - 1 && (
                // horizontal line except for last one
                <hr
                  style={{
                    width: "80%",
                    border: "1px solid #CACACA",
                    margin: "0 auto",
                  }}
                />
              )}
            </>
          ))}
        </div>
      </Scrollbar>
    </Box>
  );
};
