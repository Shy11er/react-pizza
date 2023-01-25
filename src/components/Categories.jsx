import React from "react";

import AppContext from "../context";

export default function Categories() {
  const { setCategoryItems } = React.useContext(AppContext);

  const [isActive, setIsActive] = React.useState(0);

  const liItems = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

  const onClickCategory = (index) => {
    setIsActive(index);
    setCategoryItems(index);
  };

  return (
    <div className="categories">
      <ul>
        {liItems.map((item, index) => {
          return (
            <li
              key={index}
              className={isActive === index ? "active" : ""}
              onClick={() => {
                onClickCategory(index);
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
