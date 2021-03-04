import React from "react";
import AnalyticsTermOffered from "./AnalyticsTermOffered";
import AnalyticsInstructors from "./AnalyticsInstructors";

export const ANALYTICS_OPTIONS = Object.freeze({
  HISTORICAL_DATA: "Historical Data",
  INSTRUCTOR_SENTIMENT: "Instructor Sentiment",
  COURSE_SENTIMENT: "Course Sentiment",
});

export const AnalyticsContent = ({ course, selectedAnalytics }) => {
  switch (selectedAnalytics) {
    case ANALYTICS_OPTIONS.HISTORICAL_DATA:
      return "HISTORICAL_DATA";
    case ANALYTICS_OPTIONS.INSTRUCTOR_SENTIMENT:
      return "INSTRUCTOR_SENTIMENT";
    case ANALYTICS_OPTIONS.COURSE_SENTIMENT:
      return "COURSE_SENTIMENT";
    default:
      return "default";
  }
};
