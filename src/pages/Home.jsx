import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";

import AppContext from "../context";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

const Home = ({ searchValue, setSearchValue }) => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const order = sortType.includes("-") ? "asc" : "desc";
        const sortBy = sortType.replace("-", "");
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

  const onClickCurrentPage = (pageId) => {
    dispatch(setCurrentPage(pageId))
  }

  return (
    <AppContext.Provider
      value={{
        categoryId,
        onChangeCategory,
        searchValue,
        setSearchValue,
        sortType,
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
        <Pagination onClickCurrentPage={onClickCurrentPage} />
      </div>
    </AppContext.Provider>
  );
};

export default Home;
