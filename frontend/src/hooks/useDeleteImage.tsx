import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getApiDomain } from "../config";

const useDeleteImageMutation = (
  onSuccess: () => void,
  onError: (error: any) => void
) => {
  return useMutation({
    mutationFn: async (imageId: string) => {
      const { data } = await axios.delete(
        `${getApiDomain()}/api/images/${imageId}`
      );
      return data;
    },
    onSuccess,
    onError,
  });
};

export default useDeleteImageMutation;
