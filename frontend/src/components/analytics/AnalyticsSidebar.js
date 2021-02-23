import React from 'react'
import { Scrollbar } from "react-scrollbars-custom";
import { Box } from 'grommet'
import { ANALYTICS_OPTIONS } from './AnalyticsContent'

export const AnalyticsSidebar = ({ selectedAnalytics, setSelectedAnalytics }) => {
    return (
        <Box
            style={{ overflowY: "auto" }}
            background="light-1"
            round={{ size: "small", corner: "bottom-left" }}
        >
            <Scrollbar>
                <div style={{ display: "flex", flexFlow: "column" }}>
                    {Object.entries(ANALYTICS_OPTIONS).map(([key, option]) =>
                        <button style={{ color: `${selectedAnalytics === option ? "gray" : ""}` }}
                            onClick={() => setSelectedAnalytics(option)}>
                            {option}
                        </button>)
                    }
                </div>
            </Scrollbar>
        </Box>
    )
}
