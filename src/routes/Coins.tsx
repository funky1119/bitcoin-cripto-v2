import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { useQuery } from "react-query";
import { coinsApi } from "../api";

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", coinsApi);
  console.log("data", data);
  return (
    <Container>
      <Helmet>
        <title>BangBang Coin</title>
      </Helmet>
      <Header>
        <Title>Welcome Coin</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data ? (
            data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link to={coin.id} state={{ name: coin.name }}>
                  <Img
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id.toLowerCase()}.png`}
                    // src={`${CONST.COIN_ICON}/${coin.symbol.toLowerCase()}`}
                    alt={coin.id}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))
          ) : (
            <NoData>
              데이터를 불러오지 못하였습니다.(API 호출 빈도수 초과)
            </NoData>
          )}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul`
  margin: 10px 0;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.buttonColor};
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-bottom: 10px;
  border-radius: 10px;
  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
    padding: 20px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.bgColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
  margin: 20px 0 10px;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const NoData = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
