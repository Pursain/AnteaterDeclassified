import React from "react";
import HistoricalDataContainer from "./HistoricalDataContainer/HistoricalDataContainer";

export const ANALYTICS_OPTIONS = Object.freeze({
  HISTORICAL_DATA: "Historical Data",
  INSTRUCTOR_SENTIMENT: "Instructor Sentiment",
  COURSE_SENTIMENT: "Course Sentiment",
});

export const AnalyticsContent = ({ course, selectedAnalytics }) => {
  switch (selectedAnalytics) {
    case ANALYTICS_OPTIONS.HISTORICAL_DATA:
      return <HistoricalDataContainer course={course} />;
    case ANALYTICS_OPTIONS.INSTRUCTOR_SENTIMENT:
      return "INSTRUCTOR_SENTIMENT";
    case ANALYTICS_OPTIONS.COURSE_SENTIMENT:
      return "COURSE_SENTIMENT";
    default:
      return "default";
  }
};
