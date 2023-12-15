import CONST from "./utils/Const";

export const coinsApi = () => {
  return fetch(`${CONST.PAPRIKA_URL}/coins`).then((response) =>
    response.json()
  );
};

export const infoDataApi = (coinId?: string) => {
  return fetch(`${CONST.PAPRIKA_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
};

export const priceDataApi = (coinId?: string) => {
  return fetch(`${CONST.PAPRIKA_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
};

export const coinHistoryApi = (coinId?: string) => {
  return fetch(`${CONST.OHLCV_URL}coinId=${coinId}`).then((response) =>
    response.json()
  );
};
