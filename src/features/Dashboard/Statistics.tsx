

import { useTheme } from "../../components/ThemeProviderComponent";
import { memo } from "react";
import { Card, Typography } from "antd";

const Statistics: React.FC = memo(() => {
  const { themeMode } = useTheme();

  const data = [
    {
      name: "Total Tickets",
      amount: `473`,
    },
    {
      name: "Total Bookings",
      amount: `443`,
    },
    {
      name: "sold out Tickets",
      amount: `1000`,
    },
    {
      name: "cancelled Tickets",
      amount: `2`,
    },
  ];

  return (
    <div className="w-full flex gap-5 overflow-auto mt-5">
      {data.map((item, index) => (
        <Card
          key={index}
          className={`!w-[80%] !min-w-[15rem] !border
             ${"text-center"}
           !border-[#E8E8E8] dark:!border-[#1F1F1F] !rounded-[8px]`}
          style={{
            backgroundColor: themeMode === "dark" ? "#1F1F1F" : "#FFF",
          }}
        >
          <>
            <Typography className="!text-gray-text !font-inter-medium !text-[14px]">
              {item.name}
            </Typography>
            <Typography className="!font-inter-bold !text-[1.2rem] !mt-4">
              {item.amount}
            </Typography>
          </>
        </Card>
      ))}
    </div>
  );
});

export default Statistics;
