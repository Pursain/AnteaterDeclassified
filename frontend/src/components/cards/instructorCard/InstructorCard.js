import React from 'react'
import { useState, useEffect } from 'react'
import { ResponsiveWaffle } from '@nivo/waffle'
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

const InstructorCard = ({ course }) => {

    const [data, setData] = useState(null);
    let totalBlocks = 0;

    useEffect(async () => {
        const result = await axios(
            `${process.env.REACT_APP_BACKEND_DOMAIN}/api/InstructorSummary?course=${encodeURIComponent(course)}`,
        );
        console.log(result);

        totalBlocks = result.data.reduce(((acc, cur) => acc + cur.count), 0)
        console.log(totalBlocks)

        var formatedData = result.data.map(element => ({
            "id": element.instructor,
            "label": element.instructor,
            "value": element.count ,
            "tooltipData": element.yearyearTerms
        }));

        setData(formatedData);
    }, []);

    return (
        <Card>
            <p>Instructor Record</p>
            <AutoSizer>
                {({ height, width }) => (
                    data
                        ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: height - 50, width: width }}>
                            <ResponsiveWaffle
                                data={data}
                                total={36}
                                rows={6}
                                columns={6}
                                margin={{ top: 10, right: 10, bottom: 10, left: 120 }}
                                colors={{ scheme: 'nivo' }}
                                borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
                                animate={true}
                                motionStiffness={90}
                                motionDamping={11}
                                // tooltip={function (e) {
                                //     var t = e.datum;
                                //     console.log(t);
                                //     return (
                                //         <HoverBox >
                                //             {/* <p>{t.id}</p> */}
                                //             <p>{t.data.tooltipData.toString()}</p>
                                //         </HoverBox>
                                //     );
                                // }}
                                legends={[
                                    {
                                        anchor: 'top-left',
                                        direction: 'column',
                                        justify: false,
                                        translateX: -100,
                                        translateY: 0,
                                        itemsSpacing: 4,
                                        itemWidth: 100,
                                        itemHeight: 20,
                                        itemDirection: 'left-to-right',
                                        itemOpacity: 1,
                                        itemTextColor: '#777',
                                        symbolSize: 20,
                                        effects: [
                                            {
                                                on: 'hover',
                                                style: {
                                                    itemTextColor: '#000',
                                                    itemBackground: '#f7fafb'
                                                }
                                            }
                                        ]
                                    }
                                ]}
                            />
                        </div>
                        : "Loading"
                )}
            </AutoSizer>
        </Card>
    )
}

export default InstructorCard;