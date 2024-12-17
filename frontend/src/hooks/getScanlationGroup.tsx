import { useState, useEffect } from "react";
import axios from "axios";

const getScanlationGroup = (endpoint: string) => {
  const [group, setGroup] =
    useState<{ id: string; type: string; attributes: { name: string } }[]>();
  const [error, setError] = useState<string | null>(null);

  const fetchScanlationGroup = () => {
    axios
      .get(endpoint)
      .then((response) => {
        setGroup(response.data.data.relationships);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    fetchScanlationGroup();
  }, [endpoint]);

  return { group, error, refetch: fetchScanlationGroup };
};

export default getScanlationGroup;
