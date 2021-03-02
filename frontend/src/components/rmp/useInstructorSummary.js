import axios from "axios";
import { useState, useEffect } from "react";

const useInstructorSummary = (course) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [instructorInfos, setInstructorInfos] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/InstructorSummary`, {
        params: {
          course: course,
        },
      })
      .then((result) => {
        setInstructorInfos(result.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [course, setInstructorInfos]);

  return [instructorInfos, isLoading, error];
};

export default useInstructorSummary;
