import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Card from '../../layouts/card/Card'
import styled from 'styled-components';
import ReactTooltip from "react-tooltip";
import Tooltip from "@material-ui/core/Tooltip";

const CustomColorCard = styled(Card)`
    background: #5E81AC;
`

const CourseTitle = styled.p`
    text-align: left;
    font-size: 36px;
    font-weight: bold;
    color: #D8DEE9;
    margin: 16px;

`;

const CourseDesc = styled.p`
    text-align: left;
    font-size: 14px;
    color: #D8DEE9;
    margin: 16px;
`;

const OverflowContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    margin: 0px 16px 16px 16px;
    cursor: context-menu;
`;

const HoverableText = styled.p`
    font-size: 14px;
    background-color: #D8DEE9;
    border-radius: 10px;
    padding: 2px 8px 2px 8px;
    margin: 3px;
`;

export default function CourseCard({ course }) {
    const [data, setData] = useState(null);

    useEffect(async () => {
        console.log("confused", process.env.REACT_APP_BACKEND_DOMAIN);
        console.log("confused2", `${process.env.REACT_APP_BACKEND_DOMAIN}/api/CourseSummary?course=${encodeURIComponent(course)}`);

        const result = await axios(
            `${process.env.REACT_APP_BACKEND_DOMAIN}/api/CourseSummary?course=${encodeURIComponent(course)}`,
        );
        console.log(result);
        const formattedData = {
            title: result.data.title,
            desc: result.data.desc,
            prereq: result.data.prereqStr,
            coreq: result.data.coreqStr,
            sameas: result.data.sameAsStr,
            restrict: result.data.restrictStr,
            repeat: result.data.repeatStr,
            concurrentWith: result.data.concurrentWithStr,
            gradeOption: result.data.gradeOptionStr,
            overlapsWith: result.data.overlapsWithStr,
            breadthCode: result.data.breadthCodeStr,
            designUnits: result.data.designUnitsStr
        }

        setData(formattedData);
    }, []);

    // const title = "Concepts in Programming Languages I";
    // const desc = "In-depth study of several contemporary programming languages stressing variety in data structures, operations, notation, and control. Examination of different programming paradigms, such as logic programming, functional programming and object-oriented programming; implementation strategies, programming environments, and programming style.";
    // const prereq = "Prerequisite: (I&C SCI 51 or CSE 31 or EECS 31) and (I&C SCI 46 or CSE 46). I&C SCI 51 with a grade of C or better. CSE 31 with a grade of C or better. EECS 31 with a grade of C or better. I&C SCI 46 with a grade of C or better. CSE 46 with a grade of C or better"
    // const coreq = ""
    // const sameas = "Same as IN4MATX 101."
    // const restrict = "Restriction: School of Info & Computer Sci students have first consideration for enrollment. Computer Science Engineering Majors have first consideration for enrollment."
    // const repeat = ""
    // const concurrentWith = ""
    // const gradeOption = ""
    // const overlapsWith = ""
    // const breadthCode = ""
    // const designUnits = ""
    return (
        <CustomColorCard>
            {data ?
                <>
                    <CourseTitle>{data.title}</CourseTitle>
                    <CourseDesc>{data.desc}</CourseDesc>
                    <OverflowContainer>
                        {data.prereq &&
                            <Tooltip
                                title={data.prereq}
                                placement="top">
                                <HoverableText>Prerequisites</HoverableText>
                            </Tooltip>}
                        {data.coreq &&
                            <Tooltip
                                title={data.coreq}
                                placement="top">
                                <HoverableText>Corequisites</HoverableText>
                            </Tooltip>}
                        {data.sameas &&
                            <Tooltip
                                title={data.sameas}
                                placement="top">
                                <HoverableText>Same as</HoverableText>
                            </Tooltip>}
                        {data.restrict &&
                            <Tooltip
                                title={data.restrict}
                                placement="top">
                                <HoverableText>Restrictions</HoverableText>
                            </Tooltip>}
                        {data.repeat &&
                            <Tooltip
                                title={data.repeat}
                                placement="top">
                                <HoverableText>Repeat</HoverableText>
                            </Tooltip>}
                        {data.concurrentWith &&
                            <Tooltip
                                title={data.concurrentWith}
                                placement="top">
                                <HoverableText>Concurrent with</HoverableText>
                            </Tooltip>}
                        {data.gradeOption &&
                            <Tooltip
                                title={data.gradeOption}
                                placement="top">
                                <HoverableText>Grade Option</HoverableText>
                            </Tooltip>}
                        {data.overlapsWith &&
                            <Tooltip
                                title={data.overlapsWith}
                                placement="top">
                                <HoverableText>Overlaps with</HoverableText>
                            </Tooltip>}
                        {data.breadthCode &&
                            <Tooltip
                                title={data.breadthCode}
                                placement="top">
                                <HoverableText>Breadth Code</HoverableText>
                            </Tooltip>}
                        {data.designUnits &&
                            <Tooltip
                                title={data.designUnits}
                                placement="top">
                                <HoverableText>Design Units</HoverableText>
                            </Tooltip>}
                    </OverflowContainer>
                </>
                : "Loading"}
        </CustomColorCard>
    )
}
