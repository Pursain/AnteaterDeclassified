import React, { useEffect, useState } from 'react'
import { Grid, Box } from 'grommet'
import { AnalyticsSidebar } from './AnalyticsSidebar'
import { AnalyticsContent, ANALYTICS_OPTIONS } from './AnalyticsContent'


export const AnalyticsContainer = ({ course }) => {
    const [selectedAnalytics, setSelectedAnalytics] = useState(ANALYTICS_OPTIONS.TERMS_OFFERED)

    return (
        // TODO responsive Grid
        <Grid
            rows={['xxsmall', 'flex']}
            columns={['300px', 'flex']}
            areas={[
                { name: 'Header', start: [0, 0], end: [1, 0] },
                { name: 'Sidebar', start: [0, 1], end: [0, 1] },
                { name: 'Content', start: [1, 1], end: [1, 1] }
            ]}
            fill="vertical"
        >
            <Box background="light-5" gridArea="Header" round={{ size: "small", corner: "top" }}>
                Header
            </Box>

            <AnalyticsSidebar gridArea="Sidebar" selectedAnalytics={selectedAnalytics} setSelectedAnalytics={setSelectedAnalytics} />

            <AnalyticsContent gridArea="Content" course={course} selectedAnalytics={selectedAnalytics} />
        </Grid>
    )
}
