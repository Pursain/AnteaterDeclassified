import React, { useState } from 'react'
import { Box, Grid } from 'grommet'
import { HomepageLayout } from '../layouts/pages/HomepageLayout'
import { LearnMore } from '../learnMore/LearnMore'
import { SearchField } from '../search/SearchField'
import { useSearch } from '../../hooks/search/Search'
import { useDebounce } from '../../hooks/debounce/Debounce'
import { SearchResults } from '../search/SearchResults'


export const Homepage = () => {
    const [searchString, setSearchString] = useState("")
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const debouncedSearchString = useDebounce(searchString, 300);
    const [searchResults] = useSearch(debouncedSearchString);

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
                    <SearchField searchString={searchString}
                        setSearchString={setSearchString}
                        searchResults={searchResults}
                        highlightedIndex={highlightedIndex}
                        setHighlightedIndex={setHighlightedIndex}
                    />
                    {debouncedSearchString
                        ?
                        <SearchResults
                            searchResults={searchResults}
                            debouncedSearchString={debouncedSearchString}
                            highlightedIndex={highlightedIndex}
                            setHighlightedIndex={setHighlightedIndex}
                        />
                        :
                        <LearnMore />
                    }
                </Grid>
            </Box>
        </HomepageLayout >
    )
}
