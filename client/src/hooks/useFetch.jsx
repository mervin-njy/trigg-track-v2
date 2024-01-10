import { useState } from "react";

function useFetch(endpoint, requestOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (endpoint, requestOptions) => {
    console.log("fetching data");
    setIsLoading(true);
    setError(null);
    setData(null);

    // console.log(
    //   "backend url for endpoints:",
    //   process.env.REACT_APP_BACKEND_URL
    // );

    try {
      const response = await fetch(
        `https://trigg-track-v2-backend.vercel.app/${endpoint}`,
        requestOptions
      );
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    }
    setIsLoading(false);
  };

  return { fetchData, isLoading, data, error };
}

export default useFetch;
