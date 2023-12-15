export const NumberFormat = (value: string | number) => {
  const number = typeof value === "string" ? Number(value) : value;

  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
};
