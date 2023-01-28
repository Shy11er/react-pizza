import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "../redux/filter/slice";
import { SelectFilter } from "../redux/filter/selector";

const categories: string[] = [
  "All",
  "Meat",
  "Vegetarian",
  "Grill",
  "Spicy",
  "Closed",
];

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const { categoryId } = useSelector(SelectFilter);

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={index}
              className={categoryId === index ? "active" : ""}
              onClick={() => {
                dispatch(setCategoryId(index));
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
