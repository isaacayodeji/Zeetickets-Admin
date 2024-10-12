import { useCallback } from "react";
import { usePostDataMutation } from "../store/api/api.Config";
import { API } from "../models/client/response";
import useToast from "./useToast";

export const useMethodData = () => {
  const [onPostData, { isLoading }] = usePostDataMutation();

  const onNotify = useToast();

  const PostData = useCallback(
    async (request: any, getUrl: string) => {
      const response = await onPostData({ request, getUrl });
      const apiResponse: API<any> = response.error || response.data;
      if (
        apiResponse?.responseCode === "200" ||
        apiResponse?.responseCode === "201"
      ) {
        onNotify("success", apiResponse?.responseMessage);
        console.log(apiResponse.data);
        return apiResponse.data;
      } else {
        onNotify("error", apiResponse?.responseMessage ?? "An error occurred");
      }
    },
    [onNotify, onPostData]
  );

  return { PostData, loading: isLoading };
};
