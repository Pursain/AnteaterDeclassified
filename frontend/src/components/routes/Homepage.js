import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Grid, Text, Keyboard, Anchor } from 'grommet'
import { HomepageLayout } from '../layouts/pages/HomepageLayout'
import { Scrollbar } from "react-scrollbars-custom";
import { LearnMore } from '../learnMore/LearnMore'
import { SearchField } from '../search/SearchField'
import { useSearch } from '../../hooks/search/Search'
import { useDebounce } from '../../hooks/debounce/Debounce'


export const Homepage = () => {
    const [searchString, setSearchString] = useState("")
    const debouncedSearchString = useDebounce(searchString, 300);
    const [searchResults] = useSearch(debouncedSearchString);
    const history = useHistory();

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
                    <Keyboard onEnter={() => {
                        if (searchResults)
                            history.push(`/${encodeURIComponent(searchResults[0].item.course)}`)
                    }}>
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

                    {debouncedSearchString ?
                        <Scrollbar>
                            <Box
                                gridArea="Content"
                                round={{ "size": "xsmall", "corner": "bottom" }}
                                pad={{
                                    "top": "medium",
                                    "bottom": "medium",
                                    "left": "small",
                                    "right": "small"
                                }}
                                style={{ overflowY: "auto" }}
                                animation="fadeIn"
                            >
                                {searchResults && searchResults.map((result, index) =>
                                    <Anchor onClick={() => history.push(`/${encodeURIComponent(result.item.course)}`)}>
                                        <Box
                                            height="xxsmall"
                                            background={index == 0 ? "neutral-3" : ""}
                                            round="small"
                                            align="start"
                                            justify="center"
                                            pad="small"
                                            hoverIndicator={{
                                                dark: { color: "neutral-3", opacity: "1" }
                                            }}
                                        >
                                            <Text>{result.item.course} : {result.item.title}</Text>
                                        </Box>
                                    </Anchor>
                                )}
                            </Box>
                        </Scrollbar>
                        :
                        <Box
                            gridArea="Content"
                            round={{ "size": "xsmall", "corner": "bottom" }}
                            animation="fadeIn"
                        >
                            <LearnMore />
                        </Box>
                    }
                </Grid>
            </Box>
        </HomepageLayout >
    )
}
