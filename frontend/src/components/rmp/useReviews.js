import axios from "axios";
import { useState, useEffect } from "react";

const useReviews = (course, selectedInstructor) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    if (selectedInstructor) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/RMPSummary`, {
          params: {
            course: course,
            instructor: selectedInstructor.instructor,
          },
        })
        .then((result) => {
          setReviews(result.data.ratings.reverse());
          setIsLoading(false);
        })
        .catch((err) => setError(err));
    }
  }, [course, selectedInstructor, setReviews]);

  return [reviews, isLoading, error];
};

export default useReviews;
