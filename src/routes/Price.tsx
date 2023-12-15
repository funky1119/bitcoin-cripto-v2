import { ICoinParams } from "../models/Coin";

function Price({ coinId }: ICoinParams) {
  return <h1>Price {coinId}</h1>;
}

export default Price;
