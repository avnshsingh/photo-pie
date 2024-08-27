import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getApiDomain } from "../config";

const useUploadImageMutation = (
  onSuccess: () => void,
  onError: (error: any) => void
) => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axios.post(
        `${getApiDomain()}/api/images/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onSuccess,
    onError,
  });
};

export default useUploadImageMutation;
