import React from "react";

export default function Categories() {
  const [isActive, setIsActive] = React.useState(0);

  const liItems = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

  const onClickCategory = (index) => {
    setIsActive(index);
  };

  return (
    <div className="categories">
      <ul>
        {liItems.map((item, index) => {
          return (
            <li
              key={index}
              className={isActive == index ? "active" : ""}
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
