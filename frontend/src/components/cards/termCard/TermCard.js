import React from 'react'
import { useState, useEffect } from 'react'
import { ResponsivePie } from '@nivo/pie'
import axios from 'axios';
import Card from '../../layouts/card/Card'
import { AutoSizer } from 'react-virtualized'   // TODO: use autosizer only package
import styled from 'styled-components';

const HoverBox = styled.div`
    background-color: #ffffff;
    padding: 1px 5px 1px 5px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 15px;
`;

const TermCard = ({ course }) => {

    const [data, setData] = useState(null);

    useEffect(async () => {
        const result = await axios(
            `http://localhost:7071/api/HttpTriggerCSharp1?course=${encodeURIComponent(course)}`,
        );
        console.log(result);

        var formatedData = result.data.map(element => ({
            "id": element.term,
            "label": element.term,
            "value": element.count,
            "tooltipData": element.years
        }));

        setData(formatedData);
    }, []);

    return (
        <Card>
            <p>Terms Offered</p>
            <AutoSizer>
                {({ height, width }) => (
                    data
                        ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: height - 50, width: width }}>
                            <ResponsivePie
                                data={data}
                                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
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
                                    console.log(t);
                                    return (
                                        <HoverBox >
                                            <p>{t.id}</p>
                                            <p>{t.data.tooltipData.toString()}</p>
                                        </HoverBox>
                                    );
                                }}
                            // legends={[
                            //     {
                            //         anchor: 'bottom',
                            //         direction: 'row',
                            //         justify: false,
                            //         translateX: 0,
                            //         translateY: 56,
                            //         itemsSpacing: 0,
                            //         itemWidth: 100,
                            //         itemHeight: 18,
                            //         itemTextColor: '#999',
                            //         itemDirection: 'left-to-right',
                            //         itemOpacity: 1,
                            //         symbolSize: 18,
                            //         symbolShape: 'circle',
                            //         effects: [
                            //             {
                            //                 on: 'hover',
                            //                 style: {
                            //                     itemTextColor: '#000'
                            //                 }
                            //             }
                            //         ]
                            //     }
                            // ]}
                            />
                        </div>
                        : "Loading"
                )}
            </AutoSizer>
        </Card>
    )
}

export default TermCard;