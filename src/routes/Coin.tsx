import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

interface ICoinParams {
  coinId?: string;
}

interface ICoinData {
  state: { name: string };
}

function Coin() {
  const { coinId }: ICoinParams = useParams();
  const { state }: ICoinData = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading"}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : <h1>Coin: {coinId}</h1>}
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
