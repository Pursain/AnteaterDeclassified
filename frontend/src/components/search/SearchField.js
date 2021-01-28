import React, { useRef, useEffect } from 'react'
import { TextInput } from 'grommet'

export const SearchField = ({ searchString, setSearchString }) => {

    // focus searchbox on render
    const searchBox = useRef(null);
    useEffect(() => {
        searchBox.current.focus()
    }, [])

    return (
        <TextInput
            placeholder="Spotlight Search"
            value={searchString}
            onChange={event => setSearchString(event.target.value)}
            size="large"
            plain="full"
            ref={searchBox}
        />
    )
}

