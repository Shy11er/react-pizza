import React from "react";
import axios from "axios";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import Card from "./components/Card";

import AppContext from "./context";

import "./scss/app.scss";

const asd = [123, 1231,23, 21]

function App() {
  const [sortBy, setSortBy] = React.useState("popularity");
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [ responseItems, data ] = await Promise.all([
          axios.get("https://63c418a0a908563575316ae6.mockapi.io/items"),
          require("./pizza_DB.json"),
        ]);

        setIsLoading(false);
        setItems(data);
      } catch (error) {
        console.error(error);
        alert("Error wtih getting API");
      }
    }

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ setSortBy, sortBy }}>
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
              {(isLoading ? [...Array(12)] : items).map((item, index) => {
                return <Card key={index} {...item} isLoading={isLoading} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
