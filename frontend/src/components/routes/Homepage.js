import React, { useState, useEffect } from 'react'

import { Box, Grid, Text, Keyboard } from 'grommet'
import { HomepageLayout } from '../layouts/pages/HomepageLayout'
import { LearnMore } from '../learnMore/LearnMore'
import { SearchField } from '../search/SearchField'



export const Homepage = () => {
    const [searchString, setSearchString] = useState("")
    const [searchResults, setSearchResults] = useState()


    useEffect(() => {
        if (searchString) {
            console.log("TODO: fuse.js")
        }
    }, [searchString])


    return (
        <HomepageLayout>
            <Box
                height="medium"
                width="large"
                elevation="xlarge"
                background="#F5F5F5"
                round="xsmall"
                animation="slideUp"
            >
                <Grid
                    rows={['80px', 'flex']}
                    columns={['full']}
                    areas={[
                        { name: 'Search', start: [0, 0], end: [0, 0] },
                        { name: 'Content', start: [0, 1], end: [0, 1] },
                    ]}
                    fill="vertical"
                >
                    <Keyboard onEnter={() => alert('TODO: hook this to click on first result')}>
                        <Box
                            gridArea="Search"
                            justify="center"
                            pad="medium"
                            direction="row"
                            round={{ "size": "xsmall", "corner": "top" }}
                            border={{ "size": "xsmall", "side": "bottom" }}
                        >
                            <Text size="large" margin={{ "right": "small" }}>🔍</Text>
                            <SearchField searchString={searchString} setSearchString={setSearchString} />
                        </Box>
                    </Keyboard>

                    {searchString ?
                        <Box
                            gridArea="Content"
                            round={{ "size": "xsmall", "corner": "bottom" }}
                        >
                            {searchString}
                        </Box>
                        :
                        <Box
                            gridArea="Content"
                            round={{ "size": "xsmall", "corner": "bottom" }}
                        >
                            <LearnMore />
                        </Box>
                    }
                </Grid>
            </Box>
        </HomepageLayout >
    )
}
