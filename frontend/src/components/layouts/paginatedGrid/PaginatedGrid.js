import React from 'react'
import {useState} from 'react';
import styled from 'styled-components';
import { useWindowSize } from '@react-hook/window-size';  // consider using throttled version

const GridRow = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    height: 100%;
`;

const GridCol = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    flex: 1 1 450px; /*grow | shrink | basis */
    background-color: lightgray;
    height: 100%;
`;

const calculateGridDimension = (width, height) => {
    return { x: Math.floor(width / 450), y: Math.floor(height / 450) };
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
export default function PaginatedGrid({ cards }) {
    const [width, height] = useWindowSize();
    const [paginationOffset, setPaginationOffset] = useState(0);
    const gridDimension = calculateGridDimension(width, height);
    const itemGrid = createItemGrid(gridDimension, cards, paginationOffset);

    console.log(itemGrid)
    console.log(width, height);
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
