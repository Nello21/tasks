import React, { useEffect, useRef, useState } from "react";

export const MyComponent = () => {
  const [count, setCount] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [fixed, setFixed] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    if (isHover) {
      () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  function handeleMouseOver(e: any) {
    setIsHover(true);
    setFixed(e.target.textContent);
  }

  function handeleMouseOut() {
    setIsHover(false);
  }

  return (
    <div>
      <h1
        onMouseOver={handeleMouseOver}
        onMouseOut={handeleMouseOut}
        style={{ border: "solid 1px black" }}
      >
        {!isHover ? count : fixed}
      </h1>
    </div>
  );
};
