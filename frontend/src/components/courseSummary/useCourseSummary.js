import axios from "axios";
import { useState, useEffect } from "react";

const useCourseSummary = (course) => {
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/CourseSummary`, {
        params: {
          course: course,
        },
      })
      .then((result) => {
        setCourseData(result.data);
        setIsLoading(false);
      })
      .catch((err) => setError(err));
  }, [course]);

  return [courseData, isLoading, error];
};

export default useCourseSummary;
