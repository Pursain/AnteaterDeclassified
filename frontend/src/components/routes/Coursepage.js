import React from 'react'
import { Box } from 'grommet'
import { CoursepageLayout } from '../layouts/pages/CoursepageLayout'

export const Coursepage = () => {
    return (
        <CoursepageLayout>
            <Box background="light-5" gridArea="Summary">
                Summary
      </Box>

            <Box background="light-2" gridArea="Analytics">
                Analytics
      </Box>

            <Box background="light-2" gridArea="RMP">
                RMP
      </Box>
        </CoursepageLayout>
    )
}
