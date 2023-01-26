import React from "react";
import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";
// import Pagination from "../components/Pagination";

import AppContext from "../context";
// import { setCategoryId } from "../redux/slices/filterSlice";

const Home = ({ searchValue, setSearchValue }) => {
  // const dispatch = useDispatch();
  // const catsegoryId = useSelector(state => state.filter.categoryId);

  // const [categoryItems, setCategoryItems] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "popularity (Asceding)",
    sortProperty: "-rating",
  });

  const onChangeCategory = (id) => {
    // console.log(id);
    // dispatch(setCategoryId(id));
    setCategoryId(id);
  };

  const onChangeSort = (obj) => {
    setSortType(obj);
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
        const sortBy = sortType.sortProperty.replace("-", "");
        const category = categoryId > 0 ? `category=${categoryId}` : "";

        const { data } = await axios.get(
          `https://63c418a0a908563575316ae6.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
        );

        setIsLoading(false);
        setItems(data);
      } catch (error) {
        console.error(error);
        alert("Error wtih getting API");
      }
    }
    // window.scrollTo(0, 0);
    fetchData();
  }, [categoryId, sortType]);

  const renderItems = (categoryIndex) => {
    // let categoriedItems = [];

    // if (sort === "popularity") {
    //   if (categoryIndex === 0) {
    //     categoriedItems = items[0];
    //   } else {
    //     categoriedItems = items[0].filter(
    //       (obj) => obj.category === categoryIndex
    //     );
    //   }
    // } else if (sort === "price") {
    //   if (categoryIndex === 0) {
    //     categoriedItems = items[1];
    //   } else {
    //     categoriedItems = items[1].filter(
    //       (obj) => obj.category === categoryIndex
    //     );
    //   }
    // } else {
    //   if (categoryIndex === 0) {
    //     categoriedItems = items[2];
    //   } else {
    //     categoriedItems = items[2].filter(
    //       (obj) => obj.category === categoryIndex
    //     );
    //   }
    // }

    if (isLoading) {
      return [...Array(12)].map((item, index) => {
        return <Skeleton key={index} />;
      });
    } else {
      return items
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
        sortType,
        onChangeSort,
        categoryId,
        onChangeCategory,
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
          <div className="content__items">{renderItems(categoryId)}</div>
        </div>
        {/* <Pagination setCurrentPage={setCurrentPage} /> */}
      </div>
    </AppContext.Provider>
  );
};

export default Home;
