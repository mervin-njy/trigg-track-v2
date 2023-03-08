import { useState } from "react";

function useFetch(url, requestOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (url, requestOptions) => {
    console.log("fetching data");
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(url, requestOptions);
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
