import React, { useMemo, useState } from "react";
import { Box, useTheme, Typography } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "state/api";
import Modal from "@mui/material/Modal";

const Monthly = () => {
  const [openSalesModal, setOpenSalesModal] = useState(false);
  const handleOpenSalesModal = () => setOpenSalesModal(true);
  const handleCloseSalesModal = () => setOpenSalesModal(false);

  const [openUnitsModal, setOpenUnitsModal] = useState(false);
  const handleOpenUnitsModal = () => setOpenUnitsModal(true);
  const handleCloseUnitsModal = () => setOpenUnitsModal(false);

  const [salesModalMessage, setSalesModalMessage] = useState("");
  const [unitsModalMessage, setUnitsModalMessage] = useState("");

  const [modalMonth, setModalMonth] = useState("");

  const { data } = useGetSalesQuery();
  const theme = useTheme();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "200px",
    height: "100px",
    bgcolor: theme.palette.primary[400],
    border: "2px solid #070812",
    boxShadow: "24px",
    padding: "8px 4px 4px 4px",
    textAlign: "center",
  };

  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
      totalSalesLine.data = [
        ...totalSalesLine.data,
        { x: month, y: totalSales },
      ];
      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        { x: month, y: totalUnits },
      ];
    });
    const formattedData = [totalSalesLine, totalUnitsLine];

    return [formattedData];
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  // const totalSalesData = formattedData[0]?.id === "totalSales";
  // const totalUnitsData = formattedData[1]?.id === "totalUnits";

  const handleOpenModal = (point) => {
    const { x: month, y: currentValue } = point.data;

    const currentLine = formattedData.find((line) => line.id === point.serieId);
    const currentMonthIndex = formattedData[0].data.findIndex(
      (elem) => elem.x === month
    );
    const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
    const previousMonthData = formattedData[0].data[previousMonthIndex];
    const previousValue = previousMonthData ? previousMonthData.y : 0;

    const difference = currentValue - previousValue;
    const percentDiff = (difference / previousValue).toFixed(2);

    const message =
      currentLine.id === "totalSales"
        ? `${Math.abs(percentDiff)}% ${
            difference > 0 ? "more" : "less"
          } sales this month!`
        : `${Math.abs(percentDiff)}% ${
            difference > 0 ? "more" : "less"
          } units sold this month!`;

    if (currentLine.id === "totalSales") {
      setSalesModalMessage(message);
      setOpenSalesModal(true);
    } else {
      setUnitsModalMessage(message);
      setOpenUnitsModal(true);
    }

    setModalMonth(point.data.x);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTHLY SALES" subtitle="Chart of monthly sales" />
      <Box height="75vh">
        {data ? (
          <ResponsiveLine
            data={formattedData}
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
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            // curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            onClick={(point) => handleOpenModal(point)}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
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
        ) : (
          <>Loading...</>
        )}
      </Box>
      <Modal
        open={openSalesModal}
        onClose={handleCloseSalesModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {data ? modalMonth : ""}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {salesModalMessage}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openUnitsModal}
        onClose={handleCloseUnitsModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {data ? modalMonth : ""}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {unitsModalMessage}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default Monthly;
