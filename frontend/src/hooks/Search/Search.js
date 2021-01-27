import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import searchIndex from "./searchIndex.json"

export const useSearch = (searchString) => {
    const [searchResults, setSearchResults] = useState()
    const [fuse, setFuse] = useState()

    useEffect(() => {
        const list = searchIndex;

        const options = {
            // isCaseSensitive: false,
            // includeScore: true,
            // shouldSort: true,
            // includeMatches: false,
            // findAllMatches: false,
            // minMatchCharLength: 1,
            // location: 0,
            threshold: 0.2,
            // distance: 100,
            useExtendedSearch: true,
            ignoreLocation: true,
            // ignoreFieldNorm: false,
            keys: [
                "course",
                "title",
                "aliases"
            ]
        };
        setFuse(new Fuse(list, options))
    }, [])

    useEffect(() => {
        if (fuse && searchString) {
            setSearchResults(fuse.search(searchString).slice(0, 10))
        }
    }, [searchString])

    return [
        searchResults
    ]
}
