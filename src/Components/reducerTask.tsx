import React from "react";
import { useRef } from "react";

export const MyComponent = () => {
  const countRef = useRef(0);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const handleClick = () => {
    for (let i = 0; i <= 12; i++) {
      countRef.current += 1;
    }
    forceUpdate();
  };

  return (
    <div>
      <h2>Count: {countRef.current}</h2>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};
