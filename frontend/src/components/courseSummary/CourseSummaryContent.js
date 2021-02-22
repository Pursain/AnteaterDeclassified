import React, { useState, useEffect } from "react";
import { Box } from "grommet";
import axios from "axios";

export const CourseSummaryContent = ({ course }) => {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/CourseSummary`, {
        params: {
          course: course,
        },
      })
      .then((result) => {
        setCourseData(result.data);
      });
  }, [course, setCourseData]);

  console.log(courseData);
  return (
    <Box
      background="#F5F5F5"
      gridArea="Content"
      round={{ size: "small", corner: "bottom" }}
      pad="medium"
      style={{ display: "flex", flexFlow: "column", alignItems: "flex-start" }}
    >
      <p
        style={{
          textAlign: "start",
          fontSize: "72px",
          lineHeight: "64px",
          margin: "8px",
        }}
      >
        {course}
      </p>
      {courseData && courseData.title && (
        <p
          style={{
            textAlign: "start",
            fontSize: "36px",
            lineHeight: "36px",
            margin: "8px",
            color: "#FFD1D1",
          }}
        >
          {courseData.title}
        </p>
      )}
      {courseData && courseData.desc && (
        <p
          style={{
            textAlign: "start",
            fontSize: "14px",
            lineHeight: "14px",
            margin: "8px",
          }}
        >
          {courseData.desc}
        </p>
      )}
      <div>
        <button
          style={{
            background: "#FFAEAE",
            borderRadius: "30px",
            border: "0",
            padding: "5px 10px 5px 10px",
            margin: "10px",
          }}
        >
          Prereq
        </button>
        <button
          style={{
            background: "#FFAEAE",
            borderRadius: "30px",
            border: "0",
            padding: "5px 10px 5px 10px",
            margin: "10px",
          }}
        >
          restrictions
        </button>
        <button
          style={{
            background: "#FFAEAE",
            borderRadius: "30px",
            border: "0",
            padding: "5px 10px 5px 10px",
            margin: "10px",
          }}
        >
          coreqs
        </button>
      </div>
    </Box>
  );
};
