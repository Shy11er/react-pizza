import React from "react";

import AppContext from "../context";

const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

export default function Categories() {
  const { onChangeCategory, categoryId } = React.useContext(AppContext);

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={index}
              className={categoryId === index ? "active" : ""}
              onClick={() => {
                onChangeCategory(index);
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
