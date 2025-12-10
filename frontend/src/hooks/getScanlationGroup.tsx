import { useEffect, useState } from "react";
import axios from "axios";

const getScanlationGroup = (chapterId?: string) => {
  const [groupName, setGroupName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchGroup = () => {
    if (!chapterId) return;

    axios
      .get(`/api/group?chapterId=${chapterId}`)
      .then((res) => {
        const groupRel = res?.data?.data?.relationships?.find(
          (r: any) => r.type === "scanlation_group"
        );

        const name = groupRel?.attributes?.name ?? null;
        setGroupName(name);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    fetchGroup();
  }, [chapterId]);

  return { groupName, error, refetch: fetchGroup };
};

export default getScanlationGroup;
