import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import AppContext from "./context";

import "./scss/app.scss";

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [responseItems, data_pop, data_price, data_alp] = await Promise.all([
          axios.get("https://63c418a0a908563575316ae6.mockapi.io/items"),
          require("./DB/pizza_DB_popularity.json"),
          require("./DB/pizza_DB_price.json"),
          require("./DB/pizza_DB_alphabet.json"),
        ]);
        
        setIsLoading(false);
        setItems([data_pop, data_price, data_alp]);
      } catch (error) {
        console.error(error);
        alert("Error wtih getting API");
      }
    }
    
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{}}>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home items={items} isLoading={isLoading} />}
          />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
