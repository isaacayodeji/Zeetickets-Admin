import { useGetDataQuery } from "../store/api/api.Config";
import { appTitle } from "../utils/helper";
import { Booking } from "../models/client/response";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { endpoints } from "../store/api/endpoints";
import { Dropdown, Tag } from "antd";
import { ColumnProps } from "antd/es/table";
import { EllipsisOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { setAllBookingState } from "../store/slices/booking.slice";

const useBooking = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.booking;
  });

  document.title = `Booking${appTitle}`;

  const { isFetching, data } = useGetDataQuery({
    getUrl:
      endpoints.booking.getAllBooking +
      `?page=${state.page}&size=${state.size}`,
  });

  const dataSource = Array.isArray(data?.data?.bookings)
    ? data?.data?.bookings.map((x: Booking, i: number) => ({
        ...x,
        key: i + 1,
      }))
    : [];

  const total = !isNaN(parseInt(data?.data?.total))
    ? parseInt(data?.data?.total)
    : 0;

  const columns: ColumnProps<Booking>[] = [
    {
      title: "BUYER EMAIL",
      dataIndex: "buyerEmail",
      key: "1",
      ellipsis: true,
    },
    {
      title: "TICKET",
      dataIndex: "ticket",
      key: "2",
      ellipsis: true,
    },
    {
      title: "QUALITY",
      dataIndex: "quantity",
      key: "3",
      ellipsis: true,
    },
    {
      title: "TOTAL AMOUNT",
      dataIndex: "totalAmount",

      key: "4",
      ellipsis: true,
    },
    {
      dataIndex: "paymentStatus",
      title: "PAYMENT STATUS",
      key: "5",
      ellipsis: true,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "6",
      ellipsis: true,
      render: (_, record: Booking) => {
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
      dataIndex: "transactionRef",
      title: "TRANSACTION REF",
      key: "7",
      ellipsis: true,
    },
    {
      title: "AUTHORIZATION URL",
      dataIndex: "authorizationUrl",
      key: "8",
      ellipsis: true,
    },
    {
      title: "ACTION",
      key: "10",
      fixed: "right",
      width: "100px",
      render(_: any, record) {
        // console.log(record);
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <button
                      onClick={() => {
                        showDetailsClick(true, record);
                      }}
                    >
                      View
                    </button>
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
  const showDetailsClick = useCallback(
    (showModal: boolean, record?: Booking) => {
      dispatch(
        setAllBookingState({
          ...state,
          showForm: showModal,
          record: record as Booking,
        })
      );
    },
    [dispatch, state]
  );

  return {
    dataSource,
    total,
    columns,
    loading: isFetching,
    state,
    showDetailsClick,
  };
};
export default useBooking;
