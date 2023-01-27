import React from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import { useNavigate, useLocation } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, { sorts } from "../components/Sort";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import NothingWasFound from "../components/NothingWasFound";

import AppContext from "../context";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import { fetchPizzas } from "../redux/slices/pizzasSlice";

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector((state) => state.pizzas);

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );

  React.useEffect(() => {
    if (location.search) {
      const params = qs.parse(location.search.substring(1));

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
      const sortBy = sort.sortProperty.replace("-", "");
      const order = sort.sortProperty.includes("-") ? "asc" : "desc";
      const category = categoryId > 0 ? `&category=${categoryId}` : "";
      const search = searchValue ? `&search=${searchValue}` : "";

      dispatch(fetchPizzas({ sortBy, order, category, search, currentPage }));
    }

    fetchData();

    // if (!isSearch.current) {
    // }

    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const renderItems = () => {
    if (status === "loading") {
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
        onChangeCategory,
        categoryId,
      }}
    >
      <div className="content">
        <div className="container">
          {items.length === 0 ? (
            <NothingWasFound />
          ) : status === "error" ? (
            <div className="empty_home">
              <h2>An error has occurred🥺</h2>
              <p>Failed to get pizzas</p>
            </div>
          ) : (
            <>
              <div className="content__top">
                <Categories />
                <Sort />
              </div>
              <h2 className="content__title">All pizzas</h2>
              <div className="content__items">{renderItems()}</div>
              {items.length === 0 ? (
                <></>
              ) : (
                <Pagination onClickCurrentPage={onClickCurrentPage} />
              )}
            </>
          )}
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default Home;
