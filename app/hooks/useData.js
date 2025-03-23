import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const useData = () => {
  const [data, useData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get("/get_data.php", { signal: controller.signal })
      .then((res) => {
        useData(res.data);
        setLoading(false);
      })
      .then((err) => {
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { data, error, isLoading };
};

export default useData;
