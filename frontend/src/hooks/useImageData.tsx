import { useQuery } from "@tanstack/react-query";
import useUserId from "./useUserId";
import { getApiDomain } from "../config";
import axios from "axios";

const useImageDataApi = () => {
  const userId = useUserId();

  return useQuery({
    queryKey: ["images", userId],
    queryFn: () => axios.get(getApiDomain() + `/api/images/${userId}`),
    enabled: !!userId,
  });
};

export default useImageDataApi;
