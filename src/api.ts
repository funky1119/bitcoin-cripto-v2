import CONST from "./utils/Const";

export const coinsApi = () => {
  return fetch(`${CONST.PAPRIKA_URL}/coins`).then((response) =>
    response.json()
  );
};
