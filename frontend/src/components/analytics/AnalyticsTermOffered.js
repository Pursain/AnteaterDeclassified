import React from 'react'
import { useState, useEffect } from 'react'
import { ResponsivePie } from '@nivo/pie'
import axios from 'axios';
import { AutoSizer } from 'react-virtualized'   // TODO: use autosizer only package
import styled from 'styled-components';

const HoverBox = styled.div`
    background-color: #ffffff;
    padding: 1px 5px 1px 5px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 15px;
`;

const AnalyticsTermOffered = ({ course }) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        axios(
            `${process.env.REACT_APP_BACKEND_DOMAIN}/api/TermSummary?course=${encodeURIComponent(course)}`,
        ).then(result => {
            // console.log(result);

            var formatedData = result.data.map(element => ({
                "id": element.term,
                "label": element.term,
                "value": element.count,
                "tooltipData": element.years
            }));

            setData(formatedData);
        })
    }, [course]);

    return (
        <div>
            <p>Terms Offered</p>
            <AutoSizer>
                {({ height, width }) => (
                    data
                        ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: height, width: width }}>
                            <ResponsivePie
                                data={data}
                                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                                innerRadius={0.5}
                                padAngle={0.7}
                                cornerRadius={3}
                                colors={{ scheme: 'nivo' }}
                                borderWidth={1}
                                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                                radialLabelsSkipAngle={10}
                                radialLabelsTextColor="#333333"
                                radialLabelsLinkColor={{ from: 'color' }}
                                sliceLabelsSkipAngle={10}
                                sliceLabelsTextColor="#333333"
                                tooltip={function (e) {
                                    var t = e.datum;
                                    return (
                                        <HoverBox >
                                            <p>{t.id}</p>
                                            <p>{t.data.tooltipData.toString()}</p>
                                        </HoverBox>
                                    );
                                }}
                            />
                        </div>
                        : "Loading"
                )}
            </AutoSizer>
        </div>
    )
}

export default AnalyticsTermOffered;