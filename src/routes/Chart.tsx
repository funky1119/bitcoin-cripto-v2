import { useQuery } from "react-query";
import { ICoinParams, IHistorycal } from "../models/Coin";
import { coinHistoryApi } from "../api";
import { useOutletContext } from "react-router-dom";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { applyThemeState } from "../state/atorms";
import { useRecoilValue } from "recoil";

function Chart() {
  const { coinId } = useOutletContext<ICoinParams>();
  const { isLoading, data } = useQuery<IHistorycal[] & { error: string }>(
    ["ohlcv", coinId],
    () => coinHistoryApi(coinId)
  );
  const applyTheme = useRecoilValue(applyThemeState);
  const [chartType, setChartType] = useState("line");

  const _onPress = (type: string) => () => {
    setChartType(type);
  };

  const lineData = {
    xaxis:
      data && !data.error ? data.map((info) => info.time_close * 1000) : [],
    series: {
      open: data && !data.error ? data.map((info) => Number(info.open)) : [],
      close: data && !data.error ? data.map((info) => Number(info.close)) : [],
    },
  };

  const candleData = {
    series:
      data && !data.error
        ? data.map((info) => {
            return {
              x: new Date(info.time_close * 1000),
              y: [info.open, info.high, info.low, info.close],
            };
          })
        : [],
  };

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          {data?.error ? (
            <Error>{data.error}</Error>
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
                      background: "inherit",
                    },
                    grid: { show: false },
                    xaxis: {
                      axisTicks: { show: false },
                      labels: { show: false },
                      type: "datetime",
                      categories: lineData.xaxis,
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
                    theme: { mode: applyTheme },
                    tooltip: {
                      y: {
                        formatter: (value) => `$${value}`,
                      },
                      theme: applyTheme,
                    },
                  }}
                  series={[
                    {
                      name: "open",
                      data: lineData.series.open,
                    },
                    {
                      name: "close",
                      data: lineData.series.close,
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
                      theme: applyTheme,
                    },
                  }}
                  series={[
                    {
                      name: "candle",
                      data: candleData.series,
                    },
                  ]}
                />
              )}
            </>
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
    props.isActive ? props.theme.activeButtonColor : props.theme.buttonColor};
  padding: 7px 0;
  border: 1px solid ${(props) => props.theme.buttonColor};
  border-radius: 10px;
  button {
    display: block;
  }
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  padding: 20px;
`;

export default Chart;
