import React from "react";
import { useState, useEffect } from "react";
import { ResponsiveRadar } from "@nivo/radar";
import axios from "axios";
import { AutoSizer } from "react-virtualized"; // TODO: use autosizer only package

const AnalyticsInstructors = ({ course }) => {
  const [data, setData] = useState(null);
  const [maxValue, setMaxValue] = useState(0);
  const [term, setTerm] = useState("fall");

  useEffect(() => {
    axios(
      `${
        process.env.REACT_APP_BACKEND_DOMAIN
      }/api/InstructorSummary?course=${encodeURIComponent(course)}`
    ).then((result) => {
      const formattedData = result.data.map((data) => ({
        instructor: data.instructor,
        fall: data.fall + 1,
        winter: data.winter + 1,
        spring: data.spring + 1,
        summerSession1: data.summerSession1 + 1,
        summerSession2: data.summerSession2 + 1,
        summerQuarterCom: data.summerQuarterCom + 1,
        summer10wk: data.summer10wk + 1,
      }));

      setMaxValue(
        result.data.reduce(
          (acc, curr) =>
            Math.max(
              curr.fall,
              curr.winter,
              curr.spring,
              curr.summerSession1,
              curr.summerSession2,
              curr.summerQuarterCom,
              curr.summer10wk,
              acc
            ),
          0
        ) + 1
      );
      console.log(maxValue);

      setData(formattedData);
    });
  }, [course, maxValue]);

  return (
    <div>
      <p>Instructor Record</p>
      <AutoSizer>
        {({ height, width }) =>
          data ? (
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                justifyContent: "center",
                height: height - 100,
                width: width,
              }}
            >
              <ResponsiveRadar
                data={data}
                keys={[`${term}`]}
                indexBy="instructor"
                maxValue={`${maxValue}`}
                margin={{ top: 50, right: 80, bottom: 40, left: 80 }}
                // curve="linearClosed"
                borderWidth={2}
                borderColor={{ from: "color" }}
                gridLevels={5}
                gridShape="circular"
                gridLabelOffset={36}
                // enableDots={true}
                // dotSize={10}
                dotColor={{ theme: "background" }}
                // dotBorderWidth={2}
                dotBorderColor={{ from: "color" }}
                // enableDotLabel={true}
                dotLabel="value"
                dotLabelYOffset={-12}
                colors={{ scheme: "set1" }}
                fillOpacity={0.25}
                blendMode="multiply"
                animate={true}
                motionConfig="wobbly"
                isInteractive={true}
                tooltipFormat={(value) => value - 1}
              />
              <p>{term}</p>
              <div style={{ display: "flex", flexFlow: "row wrap" }}>
                <button onClick={() => setTerm("fall")}>Fall</button>
                <button onClick={() => setTerm("winter")}>Winter</button>
                <button onClick={() => setTerm("spring")}>Spring</button>
                <button onClick={() => setTerm("summerSession1")}>
                  Summer Session 1
                </button>
                <button onClick={() => setTerm("summerSession2")}>
                  Summer Session 2
                </button>
                <button onClick={() => setTerm("summerQuarterCom")}>
                  Summer Quarter (Com)
                </button>
                <button onClick={() => setTerm("summer10wk")}>
                  Summer 10wk
                </button>
              </div>
            </div>
          ) : (
            "Loading"
          )
        }
      </AutoSizer>
    </div>
  );
};

export default AnalyticsInstructors;
