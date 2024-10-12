import { memo } from "react";
import { useTheme } from "../../components/ThemeProviderComponent";
import { Card, Typography } from "antd";
import { Pie } from "@ant-design/plots";

const PieChart: React.FC = memo(() => {
  const { themeMode } = useTheme();

  // Type definition for pie chart data
  interface PieChartData {
    type: string;
    value: number;
  }

  // Dummy data for the Pie chart
  const data: PieChartData[] = [
    { type: "Completed", value: 40 },
    { type: "Pending", value: 30 },
    { type: "Cancelled", value: 20 },
    { type: "Refunded", value: 10 },
  ];

  // Configuration function for the Pie chart
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [{ type: "element-active" }],
  };
  return (
    <div className="grid lg:grid-cols-3 gap-3 lg:gap-5">
      {data &&
        data.map((item, index) => (
          <Card
            style={{
              backgroundColor: themeMode === "dark" ? "#1F1F1F" : "#FFF",
            }}
            key={index}
            className={`!border !border-[#E8E8E8] dark:!border-[#1F1F1F] !rounded-[8px] !mt-5 ${"text-center"}`}
          >
        
            <>
              <Typography className="!text-gray-text !font-inter-semibold">
                Recent
              </Typography>
              <div style={{ position: "relative", height: "350px" }}>
                <Pie {...config} />
              </div>
            </>
          </Card>
        ))}
    </div>
  );
});

export default PieChart;
