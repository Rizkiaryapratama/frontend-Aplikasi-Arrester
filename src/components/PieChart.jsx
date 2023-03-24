import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [pieData, setPieData] = useState([]);
  useEffect(() => {
    fetch("https://serveraplikasiarrester.cyclic.app/bebanusaha")
      .then((response) => response.json())
      .then((data) => {
        const chartData = [
          {
            id: "Gaji Karyawan",
            label: "Gaji Karyawan",
            value: data.reduce((acc, item) => acc + item.gaji_karyawan, 0),
            color: "hsl(104, 70%, 50%)",
          },
          {
            id: "Beban Operasional",
            value: data.reduce((acc, item) => acc + item.beban_operasional, 0),
            color: "hsl(162, 70%, 50%)",
          },
          {
            id: "Biaya Jamsostek",
            label: "Biaya Jamsostek",
            value: data.reduce((acc, item) => acc + item.biaya_jamsostek, 0),
            color: "hsl(291, 70%, 50%)",
          },
          {
            id: "Biaya Lain",
            label: "Biaya Lain",
            value: data.reduce((acc, item) => acc + item.biaya_lain, 0),
            color: "hsl(229, 70%, 50%)",
          },
          {
            id: "Biaya Aset",
            label: "Biaya Aset",
            value: data.reduce((acc, item) => acc + item.biaya_aset, 0),
            color: "hsl(344, 70%, 50%)",
          },
          {
            id: "Biaya Jilid",
            label: "Biaya Jilid",
            value: data.reduce((acc, item) => acc + item.biaya_jilid, 0),
            color: "hsl(184, 70%, 50%)",
          },
          {
            id: "Biaya ATK",
            label: "Biaya ATK",
            value: data.reduce((acc, item) => acc + item.biaya_atk, 0),
            color: "hsl(430, 70%, 50%)",
          },
        ];
        setPieData(chartData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ResponsivePie
      data={pieData}
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
              strokeWidth: 1,
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
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
