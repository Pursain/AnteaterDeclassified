import React from 'react'
import { Box } from 'grommet'
import { CoursepageLayout } from '../layouts/pages/CoursepageLayout'
import { useParams } from "react-router-dom";

export const Coursepage = () => {
    let { course } = useParams();
    course = decodeURIComponent(course)
    return (
        <CoursepageLayout>
            <Box background="light-5" gridArea="Summary">
                {course}
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
