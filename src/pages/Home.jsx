import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Card from "../components/Card";

const Home = ({ isLoading, items }) => {
  const [categoryItems, setCategoryItems] = React.useState(0);
  const [sortItems, setSortItems] = React.useState("popularity");

  const renderItems = (categoryIndex, sort) => {
    let categoriedItems = [];
      
    if (sort == "popularity") {
      if (categoryIndex == 0) {
        categoriedItems = items[0]
      } else {
        categoriedItems = items[0].filter((obj) => obj.category == categoryIndex);
      }
    } else if (sort == "price") {
      if (categoryIndex == 0) {
        categoriedItems = items[1]
      } else {
        categoriedItems = items[1].filter((obj) => obj.category == categoryIndex);
      }
    } else {
      if (categoryIndex == 0) {
        categoriedItems = items[2]
      } else {
        categoriedItems = items[2].filter((obj) => obj.category == categoryIndex);
      }
    }
   
    return (isLoading ? [...Array(12)] : categoriedItems).map((item, index) => {
      return <Card key={index} {...item} isLoading={isLoading} />;
    });
  };

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories setCategoryItems={setCategoryItems} />
          <Sort setSortItems={setSortItems} sortItems={sortItems} />
        </div>
        <h2 className="content__title">All pizzas</h2>
        <div className="content__items">{renderItems(categoryItems, sortItems)}</div>
      </div>
    </div>
  );
};

export default Home;
