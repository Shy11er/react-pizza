import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";

const categories: string[] = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];


const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const categoryId  = useSelector((state: any) => state.filter.categoryId);

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

export default Categories;