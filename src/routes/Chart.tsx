import { useOutletContext } from "react-router-dom";

function Chart() {
  const { coinId } = useOutletContext<any>();

  return <h1>Chart {coinId}</h1>;
}

export default Chart;
