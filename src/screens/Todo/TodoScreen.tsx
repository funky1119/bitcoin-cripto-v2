import React from "react";

const TodoScreen = (): JSX.Element => {
  const plus = (a: number, b: number) => console.log(a + b);

  return (
    <div
      onClick={() => plus(1, 2)}
      style={{ backgroundColor: "red", width: 100, height: 100 }}
    >
      리액트 마스터 클래스 3-2 할차례
    </div>
  );
};

export default TodoScreen;
