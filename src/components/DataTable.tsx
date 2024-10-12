import { Empty, Table } from "antd";
import { TableData } from "../models/application/props";
import React from "react";
import useScreenHeight from "../customHooks/useScreenHeight";

type Props<T> = TableData<T>;

export const DataTable = React.memo(
  <T,>({
    columns,
    dataSource,
    spinning,
    total,
    page,
    scrollX,
    pageSize,
    rowSelection,
    onPagination,
    onRowSelection,
  }: TableData<T>) => {
    const { screenHeight } = useScreenHeight();

    return (
      <Table
        columns={columns}
        loading={{
          spinning,
        }}
        dataSource={dataSource}
        className="cursor-pointer shadow-md"
        pagination={{
          position: ["bottomRight"],
          onChange: onPagination,
          showSizeChanger: true,
          current: page,
          total,
          pageSize,
          hideOnSinglePage: true,
          className: "px-6 relative",
          pageSizeOptions: [
            "10",
            "20",
            "30",
            "40",
            "50",
            "60",
            "70",
            "80",
            "90",
            "100",
          ],
          showTotal: (total: number) => {
            return (
              <div className="sm:flex gap-2 border hidden border-[#E8F6FA] dark:border-[#1F1F1F] rounded-[4px] p-1 px-2 absolute left-1/3 translate-x-1/2">
                <div className="text-[#666060]">{total}</div>
                <span className="text-[#666060] -ml-1">Record(s)</span>
              </div>
            );
          },
        }}
        scroll={{ x: scrollX ? scrollX : 800, y: screenHeight - 300 }}
        rowSelection={rowSelection}
        onRow={(record: T, rowIndex: number | undefined) => {
          return {
            onClick: async () => {
              if (onRowSelection) {
                onRowSelection(rowIndex as number, record);
              }
            },
          };
        }}
        locale={{
          emptyText: (
            <div style={{ height: "100%" }}>
              <Empty
                image={<div style={{ fontSize: 40 }}>🫣</div>}
                description="No data to view."
              />
            </div>
          ),
        }}
      />
    );
  }
) as <T>(props: Props<T>) => JSX.Element;
