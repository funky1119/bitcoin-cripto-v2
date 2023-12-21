import CONST from "./utils/Const";

export const coinsApi = async () => {
  const response = await fetch(`${CONST.PAPRIKA_URL}/coins`);
  return await response.json();
};

export const infoDataApi = async (coinId?: string) => {
  const response = await fetch(`${CONST.PAPRIKA_URL}/coins/${coinId}`);
  return await response.json();
};

export const priceDataApi = async (coinId?: string) => {
  const response = await fetch(`${CONST.PAPRIKA_URL}/tickers/${coinId}`);
  return await response.json();
};

export const coinHistoryApi = async (coinId?: string) => {
  const response = await fetch(`${CONST.OHLCV_URL}coinId=${coinId}`);
  return await response.json();
};
