import { useEffect, useState } from "react";
import { Outlet, useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import CONST from "../utils/Const";
import { ICoinInfo, ICoinPriceInfo } from "../models/Coin";
import { Link } from "react-router-dom";

interface ICoinParams {
  coinId?: string;
}

interface ICoinState {
  state: { name: string };
}

function Coin() {
  const { coinId }: ICoinParams = useParams();
  const { state }: ICoinState = useLocation();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<ICoinInfo>();
  const [priceInfo, setPriceInfo] = useState<ICoinPriceInfo>();
  const chartMatch = useMatch("/:coinId/chart");
  const priceMatch = useMatch("/:coinId/price");

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`${CONST.PAPRIKA_URL}/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`${CONST.PAPRIKA_URL}/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{state?.name || (loading ? "Loading" : info?.name)}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "YES" : "NO"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Suply:</span>
              <span>{priceInfo?.max_supply}</span>
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

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
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
