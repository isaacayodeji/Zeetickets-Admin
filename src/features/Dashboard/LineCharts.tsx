import React, { useEffect } from "react";
import { Chart } from "@antv/g2";

const LineChart: React.FC = () => {
  useEffect(() => {
    const data = [
      { year: "1991", value: 3 },
      { year: "1992", value: 4 },
      { year: "1993", value: 3.5 },
      { year: "1994", value: 5 },
      { year: "1995", value: 4.9 },
      { year: "1996", value: 6 },
      { year: "1997", value: 7 },
      { year: "1998", value: 9 },
      { year: "1999", value: 13 },
    ];

    // Initialize the chart instance
    const chart = new Chart({
      container: "container", // Reference the container's ID
      autoFit: true,
    });

    chart
      .data(data)
      .encode("x", "year")
      .encode("y", "value")
      .scale("x", {
        range: [0, 1],
      })
      .scale("y", {
        domainMin: 0,
        nice: true,
      });

    chart.line().label({
      text: "value",
      style: {
        dx: -10,
        dy: -12,
      },
    });

    chart.point().style("fill", "white").tooltip(false);

    chart.render();

    // Cleanup the chart instance when the component is unmounted
    return () => {
      chart.destroy();
    };
  }, []);

  return <div id="container" style={{ width: "100%", height: "500px" }} />;
};

export default LineChart;
