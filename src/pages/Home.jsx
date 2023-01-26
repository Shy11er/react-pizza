import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";

import AppContext from "../context";
import { setCategoryId } from "../redux/slices/filterSlice";

const Home = ({ searchValue, setSearchValue }) => {
  const dispatch = useDispatch();
  const categoryId = useSelector(state => state.filter.categoryId);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: "popularity (Asceding)",
    sortProperty: "-rating",
  });

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
        const sortBy = sortType.sortProperty.replace("-", "");
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const search = searchValue ? `&search=${searchValue}` : "";

        const { data } = await axios.get(
          `https://63c418a0a908563575316ae6.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}&page=${currentPage}&limit=8`
        );

        setIsLoading(false);
        setItems(data);
      } catch (error) {
        console.error(error);
        alert("Error wtih getting API");
      }
    }
    window.scrollTo(0, 0);
    fetchData();
  }, [categoryId, sortType, searchValue, currentPage]);

  const renderItems = () => {
    if (isLoading) {
      return [...Array(12)].map((item, index) => {
        return <Skeleton key={index} />;
      });
    } else {
      return items.map((item, index) => {
        return <Card key={index} {...item} />;
      });
    }
  };

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangeSort = (obj) => {
    setSortType(obj);
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
          <div className="content__items">{renderItems()}</div>
        </div>
        <Pagination setCurrentPage={setCurrentPage} />
      </div>
    </AppContext.Provider>
  );
};

export default Home;
