import React from 'react'
import { Box } from 'grommet'
import { CoursepageLayout } from '../layouts/pages/CoursepageLayout'
import { useParams } from "react-router-dom";
import { RMP } from "../rmp/RMP"

export const Coursepage = () => {
    let { course } = useParams();
    course = decodeURIComponent(course)
    return (
        <CoursepageLayout>
            <Box background="light-5" gridArea="Summary" animation={["zoomIn", "fadeIn"]} round="small">
                {course}
            </Box>

            <Box background="light-2" gridArea="Analytics" animation={["zoomIn", "fadeIn"]} round="small">
                Analytics
            </Box>

            <Box background="light-2" gridArea="RMP" animation={["zoomIn", "fadeIn"]} round="small">
                <RMP />
            </Box>
        </CoursepageLayout>
    )
}
