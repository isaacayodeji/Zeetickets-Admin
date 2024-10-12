/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { useDeleteDataMutation } from "../store/api/api.Config";
import { API, TicketData } from "../models/client/response";
import { endpoints } from "../store/api/endpoints";
import useToast from "./useToast";
import { useAppSelector } from "../store/hooks";

const useDeleteTicket = () => {
  const onNotify = useToast();
  const state = useAppSelector((state) => state.ticket);
  const [DeleteData, DeleteResult] = useDeleteDataMutation();

  const onDeleteData = useCallback(
    async (id: number) => {
      try {
        const response = (await DeleteData({
          ...state,
          deleteUrl: `${endpoints.ticket.deleteTicket}${id}`,
        })) as any;
        const apiResponse: API<TicketData> =
          response.error || (response.data as TicketData);
        if (apiResponse.responseCode === 200) {
          onNotify("success", apiResponse.responseMessage as string);
        } else {
          onNotify("error", apiResponse.responseMessage as string);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [DeleteData, onNotify]
  );

  return { DeleteResult, onDeleteData };
};
export default useDeleteTicket;
