import React, { useEffect, useMemo, useState } from "react";
import { useGetProductsQuery } from "state/api";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";

const BarChart = (props) => {
  const { data, isLoading } = useGetProductsQuery();
  const [products, setProducts] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (data) {
      const filteredProducts = data.filter(
        (product) => product.category === props.category
      );

      setProducts(filteredProducts);
    }
  }, [data]);

  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const formattedData = Object.values(products).map(
      ({ name, price, stat }) => ({
        name,
        revenue: (price * stat[0].yearlyTotalSoldUnits/1000).toFixed(2),
      })
    );

    return [formattedData];
  }, [data, products]);

  console.log("produse---> ", products);
  console.log("date formatate---> ", formattedData);

  if (!data || isLoading || formattedData.length === 0) return "Loading...";

  return (
    <ResponsiveBar
      data={formattedData}
      keys={["revenue"]}
      indexBy="name"
      margin={{ top: 50, right: 130, bottom: 50, left: 90 }}
      padding={0.5}
      innerPadding={4}
      groupMode="grouped"
      valueScale={{ type: "linear", max: 3000 }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "purpleRed_green" }}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      defs={[
        {
          id: "revenue",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "revenue",
          },
          id: "revenue",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: "name",
        legendPosition: "middle",
        legendOffset: 32,
        tickTextColor: theme.palette.primary.light,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "revenue",
        legendPosition: "middle",
        legendOffset: -70,
      }}
      enableGridX={true}
      labelSkipWidth={11}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 0.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 40,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          itemTextColor: theme.palette.secondary[200],
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      enableLabel={false}
      role="application"
      ariaLabel="Breakdown Revenue"
      style={{
        tickText: { fill: "#ffedc2" },
        labelText: { fill: "#191F45" },
        tooltip: { color: "#191F45" },
      }}
    />
  );
};

export default BarChart;
