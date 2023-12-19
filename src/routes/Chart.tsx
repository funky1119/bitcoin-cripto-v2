import React from "react";
import { useQuery } from "react-query";
import { ICoinParams, IHistorycal } from "../models/Coin";
import { coinHistoryApi } from "../api";
import { useOutletContext } from "react-router-dom";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { useState } from "react";

function Chart() {
  const { coinId } = useOutletContext<ICoinParams>();
  const { isLoading, data } = useQuery<IHistorycal[]>(["ohlcv", coinId], () =>
    coinHistoryApi(coinId)
  );
  const [chartType, setChartType] = useState("candlestick");

  const _onPress = (type: string) => () => {
    setChartType(type);
  };

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <Tabs>
            <Tab isActive={chartType === "line"} onClick={_onPress("line")}>
              Line Chart
            </Tab>
            <Tab
              isActive={chartType === "candlestick"}
              onClick={_onPress("candlestick")}
            >
              Candlestick Chart
            </Tab>
          </Tabs>

          {chartType === "line" ? (
            <ApexChart
              type="line"
              options={{
                chart: {
                  toolbar: {
                    show: false,
                  },
                },
                grid: { show: false },
                xaxis: {
                  axisTicks: { show: false },
                  labels: { show: false },
                  type: "datetime",
                  categories: data?.map((info) => info.time_close * 1000),
                },
                yaxis: {
                  axisTicks: { show: true },
                  show: false,
                },
                stroke: { curve: "smooth", width: 3 },
                fill: {
                  type: "gradient",
                  gradient: {
                    gradientToColors: ["pink", "skyblue"],
                    stops: [0, 100],
                  },
                },
                colors: ["red", "blue"],
                tooltip: {
                  y: {
                    formatter: (value) => `$${value}`,
                  },
                },
              }}
              series={[
                {
                  name: "open",
                  data: data ? data.map((info) => Number(info.open)) : [],
                },
                {
                  name: "close",
                  data: data ? data.map((info) => Number(info.close)) : [],
                },
              ]}
            />
          ) : (
            <ApexChart
              type="candlestick"
              options={{
                chart: {
                  height: 350,
                  toolbar: {
                    show: false,
                  },
                },
                xaxis: {
                  axisTicks: { show: false },
                  labels: { show: false },
                  type: "datetime",
                  categories: data?.map((info) => info.time_close * 1000),
                },
                yaxis: {
                  axisTicks: { show: true },
                  show: false,
                },
                tooltip: {
                  enabled: true,
                },
              }}
              series={[
                {
                  name: "candle",
                  data: data
                    ? data?.map((info) => {
                        return {
                          x: new Date(info.time_close * 1000),
                          y: [info.open, info.high, info.low, info.close],
                        };
                      })
                    : [],
                },
              ]}
            />
          )}
        </>
      )}
    </div>
  );
}

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: ${(props) => (props.isActive ? 700 : 400)};
  background-color: ${(props) =>
    props.isActive ? "rgba(234, 186, 27, 0.5)" : "rgba(183, 77, 25, 0.5)"};
  padding: 7px 0;
  border: 1px solid rgba(183, 77, 25, 0.5);
  border-radius: 10px;
  button {
    display: block;
  }
`;

export default Chart;
