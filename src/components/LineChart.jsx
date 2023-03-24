import { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { format } from "date-fns";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [lineData, setLineData] = useState([]);
  useEffect(() => {
    fetch("https://serveraplikasiarrester.cyclic.app/kas")
      .then((response) => response.json())
      .then((data) => {
        const lastSevenData = data.slice(-20); // Get the last 25 items from the data array
        const chartData = [
          {
            id: "Saldo",
            color: colors.greenAccent[500],
            data: lastSevenData.map((item) => ({
              x: format(new Date(item.tanggal), "dd/MM/yyyy"),
              y: item.totalSaldo,
            })),
          },
          {
            id: "Out",
            color: colors.blueAccent[500],
            data: lastSevenData.map((item) => ({
              x: format(new Date(item.tanggal), "dd/MM/yyyy"),
              y: item.out,
            })),
          },
          {
            id: "In",
            color: colors.redAccent[300],
            data: lastSevenData.map((item) => ({
              x: format(new Date(item.tanggal), "dd/MM/yyyy"),
              y: item.new_in,
            })),
          },
        ];
        setLineData(chartData);
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <ResponsiveLine
      data={lineData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 2,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Tanggal", // added
        legendOffset: -36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Saldo", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
