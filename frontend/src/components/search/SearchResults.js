import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Box, Anchor, Text } from 'grommet'
import { Scrollbar } from "react-scrollbars-custom";


export const SearchResults = ({ searchResults, highlightedIndex, setHighlightedIndex, debouncedSearchString }) => {
    const history = useHistory();

    // reset highlight to top on new search query
    useEffect(() => {
        setHighlightedIndex(0)
    }, [debouncedSearchString, setHighlightedIndex])

    return (
        <Scrollbar>
            <Box
                gridArea="Content"
                round={{ "size": "xsmall", "corner": "bottom" }}
                pad={{
                    "top": "medium",
                    "bottom": "small",
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
                            background={index === highlightedIndex ? "neutral-3" : ""}
                            round="small"
                            align="start"
                            justify="center"
                            pad="small"
                            onMouseEnter={() => setHighlightedIndex(index)}
                        >
                            <Text>{result.item.course} : {result.item.title}</Text>
                        </Box>
                    </Anchor>
                )}
            </Box>
        </Scrollbar>
    )
}