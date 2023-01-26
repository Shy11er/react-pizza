import React from "react";
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";
// import Pagination from "../components/Pagination";

import AppContext from "../context";
import { setCategoryId } from "../redux/slices/filterSlice";

const Home = ({ searchValue, setSearchValue }) => {
  const dispatch = useDispatch();
  const categoryId = useSelector(state => state.filter.categoryId);

  // const [categoryItems, setCategoryItems] = React.useState(0);
  const [sortItems, setSortItems] = React.useState("popularity");
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    // console.log(id);
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [data_pop, data_price, data_alp] = await Promise.all([
          require("../DB/pizza_DB_popularity.json"),
          require("../DB/pizza_DB_price.json"),
          require("../DB/pizza_DB_alphabet.json"),
        ]);

        setIsLoading(false);
        setItems([data_pop, data_price, data_alp]);
        // for (let i = 0; i < data.length; i++) {
        //   let d = [];
        //   for (let j = currentPage*8; j < currentPage*8 + 8; j++) {
        //     d.push(data[i][j]);
        //   }
        //   setItems([]);
        //   setItems((prev) => [...prev, d]);
        // }
      } catch (error) {
        console.error(error);
        alert("Error wtih getting API");
      }
    }
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const renderItems = (categoryIndex, sort) => {
    let categoriedItems = [];

    if (sort === "popularity") {
      if (categoryIndex === 0) {
        categoriedItems = items[0];
      } else {
        categoriedItems = items[0].filter(
          (obj) => obj.category === categoryIndex
        );
      }
    } else if (sort === "price") {
      if (categoryIndex === 0) {
        categoriedItems = items[1];
      } else {
        categoriedItems = items[1].filter(
          (obj) => obj.category === categoryIndex
        );
      }
    } else {
      if (categoryIndex === 0) {
        categoriedItems = items[2];
      } else {
        categoriedItems = items[2].filter(
          (obj) => obj.category === categoryIndex
        );
      }
    }

    if (isLoading) {
      return [...Array(12)].map((item, index) => {
        return <Skeleton key={index} />;
      });
    } else {
      return categoriedItems
        .filter((item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((item, index) => {
          return <Card key={index} {...item} />;
        });
    }
  };

  return (
    <AppContext.Provider
      value={{
        onChangeCategory,
        setSortItems,
        sortItems,
        searchValue,
        setSearchValue,
      }}
    >
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {renderItems(categoryId, sortItems)}
          </div>
        </div>
        {/* <Pagination setCurrentPage={setCurrentPage} /> */}
      </div>
    </AppContext.Provider>
  );
};

export default Home;
