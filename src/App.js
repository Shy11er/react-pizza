import React from "react";

import data from "./pizza_DB.json";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import Card from "./components/Card";

import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {data.map((item, index) => {
              return (
                <Card
                  key={index}
                  {...item}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
