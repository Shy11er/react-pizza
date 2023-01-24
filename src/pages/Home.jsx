import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Card from "../components/Card";

const Home = ({isLoading, items}) => {
  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">All pizzas</h2>
        <div className="content__items">
          {(isLoading ? [...Array(12)] : items).map((item, index) => {
            return <Card key={index} {...item} isLoading={isLoading} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
