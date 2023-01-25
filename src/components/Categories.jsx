import React from "react";

export default function Categories({ setCategoryItems }) {
  const [isActive, setIsActive] = React.useState(0);
  // const [addToCategory, setAddToCategory] = React.useState([]);

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
