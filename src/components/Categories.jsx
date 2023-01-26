import React from "react";

import AppContext from "../context";

export default function Categories() {
  const { onChangeCategory, categoryId } = React.useContext(AppContext);

  const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

  // const onClickCategory = (index) => {
  //   setIsActive(index);
  //   setCategoryItems(index);
  // };

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
