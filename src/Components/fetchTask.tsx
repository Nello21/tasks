import React from "react";
import { useRef } from "react";

export const MyComponent = () => {
  let user = {
    name: "egor",
    surname: "egor",
  };

  const photoLoader = async () => {
    const url = "https://jsonplaceholder.typicode.com/photos";
    try {
      let response = await fetch(url);
      if (response.ok) {
        let photo = await response.json();
        return photo;
      } else {
        throw console.log("загрузка не удалась");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Заголовок</h2>
      <button onClick={photoLoader}>Increment</button>
    </div>
  );
};
