import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";

const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];


export default function Categories() {
  const dispatch = useDispatch();
  const categoryId  = useSelector((state) => state.filter.categoryId);

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
}
