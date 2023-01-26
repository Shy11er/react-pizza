import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, { sorts } from "../components/Sort";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";

import AppContext from "../context";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

const Home = ({ searchValue, setSearchValue }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sorts.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(setFilters({ ...params, sort }));

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const sortBy = sort.sortProperty.replace("-", "");
        const order = sort.sortProperty.includes("-") ? "asc" : "desc";
        const category = categoryId > 0 ? `&category=${categoryId}` : "";
        const search = searchValue ? `&search=${searchValue}` : "";
        
        const { data } = await axios.get(
          `https://63c418a0a908563575316ae6.mockapi.io/items?page=${currentPage}&limit=8${category}&sortBy=${sortBy}&order=${order}${search}`
        );

        setIsLoading(false);
        setItems(data);
      } catch (error) {
        console.error(error);
        alert("Error wtih getting API");
      }
    }

    if (!isSearch.current) {
      fetchData();
    }

    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const renderItems = () => {
    if (isLoading) {
      return [...Array(8)].map((_, index) => {
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
    dispatch(setCurrentPage(pageId));
  };

  return (
    <AppContext.Provider
      value={{
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
        <Pagination onClickCurrentPage={onClickCurrentPage} />
      </div>
    </AppContext.Provider>
  );
};

export default Home;
