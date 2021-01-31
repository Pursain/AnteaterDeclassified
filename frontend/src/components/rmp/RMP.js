import React, { useState } from 'react'
import { Grid, Box, } from 'grommet'
import { RMPSidebar } from './RMPSidebar'
import { RMPReviews } from './RMPReviews'

export const RMP = () => {
    const [selectedInstructor, setSelectedInstructor] = useState(null)


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

            <RMPSidebar gridArea="Sidebar" selectedInstructor={selectedInstructor} setSelectedInstructor={setSelectedInstructor} />

            <RMPReviews gridArea="Content" selectedInstructor={selectedInstructor} />
        </Grid>
    )
}
