import React, { useRef, useEffect } from 'react'
import { TextInput } from 'grommet'
import { useHistory } from 'react-router-dom'
import { Box, Text, Keyboard } from 'grommet'

export const SearchField = ({ searchResults, searchString, setSearchString, highlightedIndex, setHighlightedIndex }) => {
    const history = useHistory();

    // focus searchbox on render
    const searchBox = useRef(null);
    useEffect(() => {
        searchBox.current.focus()
    }, [])

    return (
        <Keyboard
            onEnter={() => {
                if (searchResults)
                    history.push(`/${encodeURIComponent(searchResults[highlightedIndex].item.course)}`)
            }}
            onDown={() => {
                if (searchResults)
                    setHighlightedIndex((last) => Math.min(last + 1, searchResults.length - 1));
            }}
            onUp={() => {
                if (searchResults)
                    setHighlightedIndex((last) => Math.max(last - 1, 0));
            }}
        >
            <Box
                gridArea="Search"
                justify="center"
                pad="medium"
                direction="row"
                round={{ "size": "xsmall", "corner": "top" }}
                border={{ "size": "xsmall", "side": "bottom" }}
            >
                <Text size="large" margin={{ "right": "small" }}>🔍</Text>
                <TextInput
                    placeholder="Spotlight Search"
                    value={searchString}
                    onChange={event => setSearchString(event.target.value)}
                    size="large"
                    plain="full"
                    ref={searchBox}
                />
            </Box>
        </Keyboard>
    )
}

