import React from "react";
// import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Card from "../components/Card";

import AppContext from "../context";

const Home = () => {
  const [categoryItems, setCategoryItems] = React.useState(0);
  const [sortItems, setSortItems] = React.useState("popularity");
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [ data_pop, data_price, data_alp] = await Promise.all([
          require("../DB/pizza_DB_popularity.json"),
          require("../DB/pizza_DB_price.json"),
          require("../DB/pizza_DB_alphabet.json"),
        ]);
        
        setIsLoading(false);
        setItems([data_pop, data_price, data_alp]);
      } catch (error) {
        console.error(error);
        alert("Error wtih getting API");
      }
    };
    
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const renderItems = (categoryIndex, sort) => {
    let categoriedItems = [];
      
    if (sort === "popularity") {
      if (categoryIndex === 0) {
        categoriedItems = items[0]
      } else {
        categoriedItems = items[0].filter((obj) => obj.category === categoryIndex);
      }
    } else if (sort === "price") {
      if (categoryIndex === 0) {
        categoriedItems = items[1]
      } else {
        categoriedItems = items[1].filter((obj) => obj.category === categoryIndex);
      }
    } else {
      if (categoryIndex === 0) {
        categoriedItems = items[2]
      } else {
        categoriedItems = items[2].filter((obj) => obj.category === categoryIndex);
      }
    }
   
    return (isLoading ? [...Array(12)] : categoriedItems).map((item, index) => {
      return <Card key={index} {...item} isLoading={isLoading} />;
    });
  };

  return (
    <AppContext.Provider value={{setCategoryItems, setSortItems, sortItems}}>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">{renderItems(categoryItems, sortItems)}</div>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default Home;
