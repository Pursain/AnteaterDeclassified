import React, { useState, useEffect } from 'react'
import { Scrollbar } from "react-scrollbars-custom";
import { Grid, Box, Avatar } from 'grommet'
import Cat from '../../assests/cat.png'
import Dog from '../../assests/dog.png'

export const RMPSidebar = ({ selectedInstructor, setSelectedInstructor }) => {
    const [instructorInfos, setInstructorInfos] = useState(null)

    useEffect(() => {
        // fetch
        const TEMP_PROF_INFOS = [
            {
                instructor: "Alex Thornton",
                rating: 4.3
            },
            {
                instructor: "Richard Pattis",
                rating: 3.7
            },
            {
                instructor: "Alex Thornton1",
                rating: 4.3
            }
        ]

        setInstructorInfos(TEMP_PROF_INFOS)
        setSelectedInstructor(TEMP_PROF_INFOS[0])
    }, [setSelectedInstructor])

    return (
        <Box
            style={{ overflowY: "auto" }}
            background="light-1"
            round={{ size: "small", corner: "bottom-left" }}
        >
            <Scrollbar>
                {instructorInfos
                    ?
                    instructorInfos.map((instructorInfo, index) =>
                        <Box
                            onClick={() => setSelectedInstructor(instructorInfo)}
                            background={selectedInstructor.instructor === instructorInfo.instructor ? "neutral-3" : "light-3"}
                            margin="small"
                            round="small"
                            key={index}
                        >
                            <Grid
                                rows={['80px']}
                                columns={['80px', 'flex']}
                                areas={[
                                    { name: 'Icon', start: [0, 0], end: [0, 0] },
                                    { name: 'Desc', start: [1, 0], end: [1, 0] }
                                ]}
                            >
                                <Box
                                    gridArea="Icon"
                                    justify="center"
                                    align="center"
                                    round={{ "size": "small", "corner": "left" }}
                                >
                                    <Avatar size="medium" src={index % 2 ? Cat : Dog} />
                                </Box>
                                <Box
                                    gridArea="Desc"
                                    justify="center"
                                    align="start"
                                    pad="small"
                                    round={{ "size": "small", "corner": "right" }}
                                >
                                    {`${instructorInfo.instructor}: ${instructorInfo.rating}`}
                                </Box>
                            </Grid>
                        </Box>
                    )
                    :
                    "loading"
                }
            </Scrollbar>
        </Box>
    )
}
