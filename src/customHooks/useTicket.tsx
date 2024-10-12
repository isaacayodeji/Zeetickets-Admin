/* eslint-disable react-hooks/exhaustive-deps */
import { Dropdown, Form, Image, Popconfirm, Tag } from "antd";
import { CreateTickets } from "../models/client/request";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { appTitle, FormAction } from "../utils/helper";
import { ColumnProps } from "antd/es/table";
import { API, TicketData, Tickets } from "../models/client/response";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  useDeleteDataMutation,
  useGetDataQuery,
  usePostDataMutation,
  usePutDataMutation,
} from "../store/api/api.Config";
import useToast from "./useToast";
import useDateTimeFormat from "./useDateTimeFormat";
import useAmountFormatter from "./useAmountFormatter";
import { setTicketState } from "../store/slices/ticket.slice";
import { AppPayload } from "../models/application/payload";
import { useCallback } from "react";
import { endpoints } from "../store/api/endpoints";
import dayjs from "dayjs";
import useDeleteTicket from "./useDeleteTicket";
import useURLSearchParamConfig from "./useURLSearchParamConfig";

const useTicket = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.ticket;
  });

  const { onDeleteData } = useDeleteTicket();
  const [postData, postDataResponse] = usePostDataMutation();
  const [updateData, updateResponse] = usePutDataMutation();
  const [deleteData, deleteResponse] = useDeleteDataMutation();
  const onNotify = useToast();
  const { onFormattedDateTime } = useDateTimeFormat();
  const { formattedAmount } = useAmountFormatter();
  const { setSearchParams } = useURLSearchParamConfig();

  document.title = `Ticket${appTitle}`;
  //   const request: GetDataRequest = {
  //     page: state.page,
  //     size: state.size,
  //   };
  const [form] = Form.useForm();

  const { isFetching, data } = useGetDataQuery({
    getUrl:
      endpoints.ticket.getAllTicket + `?page=${state.page}&size=${state.size}`,
  });

  const dataSource = Array.isArray(data?.data?.tickets)
    ? data?.data?.tickets.map((x: Tickets, i: number) => ({
        ...x,
        key: i + 1,
      }))
    : [];

  const total = !isNaN(parseInt(data?.data?.total))
    ? parseInt(data?.data?.total)
    : 0;

  const columns: ColumnProps<Tickets>[] = [
    {
      title: "IMAGE",
      dataIndex: "image",
      key: "1",
      ellipsis: true,
      render: (_, record: Tickets) => {
        return (
          <Image
            className="rounded-full"
            style={{ height: 40, width: 40 }}
            src={record.image}
            alt=""
          />
        );
      },
    },
    {
      title: "TITLE",
      dataIndex: "title",
      key: "2",
      ellipsis: true,
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "3",
      ellipsis: true,
      render: (_, record: Tickets) => {
        return <h2>{`₦${formattedAmount(record?.price)}`}</h2>;
      },
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",

      key: "4",
      ellipsis: true,
    },
    {
      dataIndex: "eventDate",
      title: "EVENT DATE",
      key: "5",
      ellipsis: true,
      render: (_, record: Tickets) => {
        return <h2>{onFormattedDateTime(record?.eventDate)}</h2>;
      },
    },
    {
      title: "VENUE",
      dataIndex: "venue",
      key: "6",
      ellipsis: true,
    },
    {
      dataIndex: "category",
      title: "CATEGORY",
      key: "7",
      ellipsis: true,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "8",
      width: "120px",
      ellipsis: true,
      render: (_, record: Tickets) => {
        return (
          <Tag
            color={`${
              record?.status?.toLocaleUpperCase() === "AVAILABLE"
                ? "green"
                : record?.status?.toLocaleUpperCase() === "PENDING"
                ? "orange"
                : "red"
            } `}
          >
            {record?.status}
          </Tag>
        );
      },
    },
    {
      title: "SLOTS",
      dataIndex: "slots",
      key: "9",
      ellipsis: true,
    },
    {
      title: "ACTION",
      key: "10",
      fixed: "right",
      width: "100px",
      render(_: any, record: Tickets) {
        // console.log(record);
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <button
                      onClick={() =>
                        handleFormClick(true, "VIEW", {
                          title: record.title,
                          price: record.price,
                          description: record.description,
                          eventDate: dayjs(record.eventDate), // Format the date properly or fallback to an empty string,
                          venue: record.venue,
                          category: record.category,
                          status: record.status,
                          slots: record?.slots,
                          image: record.image,
                          id: record._id,
                        })
                      }
                    >
                      View
                    </button>
                  ),
                },
                { type: "divider" },
                {
                  key: "2",
                  label: (
                    <button
                      onClick={() => {
                        handleFormClick(true, "UPDATE", {
                          title: record.title,
                          price: record.price,
                          description: record.description,
                          eventDate: dayjs(record.eventDate), // Format the date properly or fallback to an empty string,
                          venue: record.venue,
                          category: record.category,
                          status: record.status,
                          slots: record?.slots,
                          image: record.image,
                          id: record._id,
                        });
                      }}
                    >
                      Edit
                    </button>
                  ),
                },
                { type: "divider" },
                {
                  key: "3",
                  label: (
                    <Popconfirm
                      placement="top"
                      onConfirm={() => onDeleteData(record._id)}
                      title="Are you sure you want to delete this Ticket ?"
                    >
                      <button>Delete</button>
                    </Popconfirm>
                  ),
                },
              ],
            }}
            placement="bottomLeft"
            rootClassName="w-32 mt-20"
          >
            <EllipsisOutlined />
          </Dropdown>
        );
      },
    },
  ];

  const handleFormClick = useCallback(
    (showForm: boolean, action: FormAction, request?: CreateTickets) => {
      if (request) {
        dispatch(
          setTicketState(new AppPayload("request", request as CreateTickets))
        );
      } else {
        dispatch(
          setTicketState(new AppPayload("request", new CreateTickets()))
        );
      }
      dispatch(setTicketState(new AppPayload("showForm", showForm)));
      dispatch(setTicketState(new AppPayload("action", action)));
    },
    [dispatch]
  );

  const onFinish = useCallback(
    async (request?: CreateTickets): Promise<void> => {
      try {
        const response =
          state.action === "CREATE"
            ? postData({
                postUrl: endpoints.ticket.createTicket,
                request,
              })
            : state.action === "UPDATE"
            ? updateData({
                putUrl: endpoints.ticket.UpdateTicket + state.request?.id,
                request,
              })
            : deleteData({
                deleteUrl: endpoints.ticket.deleteTicket + state.request?.id,
              });

        const apiResponse: API<Tickets> =
          (await response).error || (await response).data;

        if (
          apiResponse.responseCode === 201 ||
          apiResponse.responseCode === 200
        ) {
          onNotify("success", apiResponse.responseMessage || "Successful");
          dispatch(setTicketState(new AppPayload("showForm", false)));
          const response = data;
          if (response) {
            dispatch(
              setTicketState(new AppPayload("response", response as TicketData))
            );
          }
        } else {
          onNotify(
            "error",
            apiResponse.responseMessage || "An unknown error occurred"
          );
        }
      } catch (error: any) {
        onNotify("error", error.message || "An unknown error occurred");
      }
    },
    [dispatch, data, onNotify, postData, state.action, state.request?.id]
  );

  const onClear = useCallback(() => {
    setSearchParams({});
    dispatch(setTicketState(new AppPayload("page", 0)));
    dispatch(setTicketState(new AppPayload("size", 10)));
  }, [dispatch, setSearchParams]);

  const onPaginate = useCallback(
    (page: number, pageSize: number) => {
      dispatch(setTicketState(new AppPayload("page", page  )));
      dispatch(setTicketState(new AppPayload("size", pageSize)));
    },
    [dispatch]
  );

  return {
    state,
    columns,
    onFinish,
    onPaginate,
    handleFormClick,
    onClear,
    isFetching: isFetching,
    total,
    dataSource,
    form,
    creating: postDataResponse.isLoading,
    updating: updateResponse.isLoading,
    deleting: deleteResponse.isLoading,
  };
};
export default useTicket;
