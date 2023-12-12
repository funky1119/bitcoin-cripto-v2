import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import CONST from "../utils/Const";
import { ICoinInfo, ICoinPriceInfo } from "../models/Coin";

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
      {loading ? <Loader>Loading...</Loader> : <span>{info?.description}</span>}
      <Outlet context={{ coinId }} />
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

export default Coin;
