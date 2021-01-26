import React from 'react'
import { useState, useEffect } from 'react'
import { ResponsivePie } from '@nivo/pie'
import axios from 'axios';
import Card from '../../layouts/card/Card'
import styled from 'styled-components';

const ClassSizeCard = ({ course }) => {

    const [data, setData] = useState(null);

    useEffect(async () => {
        const result = await axios(
            `${process.env.REACT_APP_BACKEND_DOMAIN}/api/ClassSizeSummary?course=${encodeURIComponent(course)}`,
        );
        console.log(result);

        setData(result.data);
    }, []);

    return (
        <Card>
            <p>Latest Class Sizes</p>
            {data ? data.map(x => (
                <div>
                    <h1>{x.term} {x.year}</h1>
                    <p>{x.enrolled}/{x.max}</p>
                </div>
            )) : <p>Loading</p>}
        </Card>
    )
}

export default ClassSizeCard;