import React from "react";
import { ICoinParams, IHistorycal } from "../models/Coin";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { coinHistoryApi } from "../api";
import moment from "moment";
import styled from "styled-components";
import { NumberComma } from "../utils/Number";

function Price() {
  const { coinId } = useOutletContext<ICoinParams>();
  const { isLoading, data } = useQuery<IHistorycal[] & { error: string }>(
    ["ohlcv", coinId],
    () => coinHistoryApi(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          {data?.error ? (
            <Error>{data.error}</Error>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Open</th>
                  <th>High</th>
                  <th>Low</th>
                  <th>Close</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.length > 0 &&
                  data.map((info, index) => (
                    <tr key={index}>
                      <td>
                        {moment(info.time_close * 1000).format("YYYY.MM.DD")}
                      </td>
                      <td>{NumberComma(info.open)}</td>
                      <td>{NumberComma(info.high)}</td>
                      <td>{NumberComma(info.low)}</td>
                      <td>{NumberComma(info.close)}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </div>
  );
}

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  float: left;
  margin: 0 0 2em;

  thead {
    border-bottom: 3px solid ${(props) => props.theme.accentColor};
    th {
      padding: 10px 0;
      font-weight: 600;
      text-align: center;
      font-size: 20px;
    }
  }

  tbody {
    border-bottom: 2px solid ${(props) => props.theme.accentColor};
    tr {
      border-bottom: 1px solid ${(props) => props.theme.accentColor};
      td {
        padding: 12px 0;
        text-align: center;
      }
    }
  }
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  padding: 20px;
`;

export default Price;
