import {
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import React from "react";
import {
  ICoinInfo,
  ICoinParams,
  ICoinPriceInfo,
  ICoinState,
} from "../models/Coin";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { infoDataApi, priceDataApi } from "../api";

function Coin() {
  const { coinId = "btc-bitcoin" }: ICoinParams = useParams();
  const { state }: ICoinState = useLocation();
  const chartMatch = useMatch("/:coinId/chart");
  const priceMatch = useMatch("/:coinId/price");
  const navigate = useNavigate();

  const { isLoading: infoLoading, data: infoData } = useQuery<ICoinInfo>(
    ["info", coinId],
    () => infoDataApi(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<ICoinPriceInfo>(
    ["price", coinId],
    () => priceDataApi(coinId)
    // {
    //   refetchInterval: 5000,
    // }
  );

  const loading = infoLoading || priceLoading;

  const _onClick = () => {
    navigate("/");
  };

  return (
    <Container>
      <Helmet>
        <title>{state?.name || (loading ? "Loading" : infoData?.name)}</title>
      </Helmet>
      <Header>
        <Button onClick={_onClick}>
          <ArrowIcon width={30} height={30} src="/images/arrow.svg" />
        </Button>
        <Title>{state?.name || (loading ? "Loading" : infoData?.name)}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price</span>
              <span>${priceData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Suply</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={"chart"}>Cart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={"price"}>Price</Link>
            </Tab>
          </Tabs>

          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  margin-left: 0;
  margin-right: auto;
  background-color: inherit;
  border: inherit;
  background: inherit;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  &:active {
    background: #ca7b47;
    color: white;
    transition: 0.5s;
  }
`;

const ArrowIcon = styled.img`
  transform: rotate(-90deg);
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  text-align: center;
  flex: 1;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(183, 77, 25, 0.5);
  padding: 10px 20px;
  align-items: center;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0;
`;

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
  a {
    display: block;
  }
`;

export default Coin;
