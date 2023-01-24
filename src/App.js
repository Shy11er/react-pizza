import React from "react";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import Card from "./components/Card";

import AppContext from "./context";

import "./scss/app.scss";

function App() {
  const [sortBy, setSortBy] = React.useState("popularity");
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await Promise.all(require("./pizza_DB.json"));

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
              {items.map((item, index) => {
                return <Card key={index} {...item} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
