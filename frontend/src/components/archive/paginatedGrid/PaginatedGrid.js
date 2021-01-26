import React from 'react'
import {useState} from 'react';
import styled from 'styled-components';
import { useWindowSize } from '@react-hook/window-size';  // TODO: consider using throttled version instead for extra responsiveness

const GridRow = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    height: 100%;
`;

const GridCol = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    flex: 1 1 420px; /*grow | shrink | basis */
    background-color: lightgray;
    height: 100%;
`;

// TODO: these are hand selected values, should reevaluate when proj progresses more
// X dimension range: 1-4
// Y dimension range: 1-2
const calculateGridDimension = (width, height) => {
    return { x: Math.min(Math.floor(width / 450),4), y: Math.min(Math.floor(height / 300), 2) };
}

// ({x:3, y:2},[1,2,3,4,5,6,7,8,9,0], 1) => [[3, 4], [5, 6], [7, 8]]
const createItemGrid = (gridDimension, items, paginationOffset = 0) => {
    let array = [[]];
    let xCount = 0;
    let yCount = 0;
    for (let item of items) {
        if (yCount >= gridDimension.y) {
            array.push([])
            xCount++;
            yCount = 0;
        }
        array[xCount].push(item);
        yCount++;
    }
    return array.slice(paginationOffset, paginationOffset + gridDimension.x);
}

// handle logic for card sizes, pagination 
export default function PaginatedGrid({ children }) {
    const [width, height] = useWindowSize();
    const [paginationOffset, setPaginationOffset] = useState(0);
    const gridDimension = calculateGridDimension(width, height);
    const itemGrid = createItemGrid(gridDimension, children, paginationOffset);

    // console.log(itemGrid)
    // console.log(width, height);
    return (
        <>
            <GridRow>
                {itemGrid.map(e => (
                    <GridCol>
                        {e}
                    </GridCol>
                ))}
            </GridRow>
            <button onClick={()=>{setPaginationOffset(paginationOffset + 1)}}>click me</button>
        </>
    )
}
