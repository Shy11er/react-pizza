import React from "react";
import { useSelector } from "react-redux";
// import qs from "qs";
// import { useNavigate, useLocation } from "react-router-dom";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";

import { setCurrentPage } from "../redux/filter/slice";
import { SelectFilter } from "../redux/filter/selector";
import { fetchPizzas } from "../redux/pizza/slice";
import { SelectPizzas } from "../redux/pizza/selector";
import { useAppDispatch } from "../redux/store";
// import { SearchPizzaParams } from "../redux/pizza/types";

const Home: React.FC = () => {
  // const location = useLocation();
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const isSearch = React.useRef(false);
  // const isMounted = React.useRef(false);

  const { items, status } = useSelector(SelectPizzas);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(SelectFilter);

  // React.useEffect(() => {
  //   if (location.search) {
  //     const params = qs.parse(
  //       location.search.substring(1)
  //     ) as unknown as SearchPizzaParams;
  //     const sort = sorts.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sorts[0],
  //       })
  //     );

  //     isSearch.current = true;
  //   }
  // }, []);

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });

  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  React.useEffect(() => {
    async function fetchData() {
      const sortBy = sort.sortProperty.replace("-", "");
      const order = sort.sortProperty.includes("-") ? "asc" : "desc";
      const category = categoryId > 0 ? `&category=${categoryId}` : "";
      const search = searchValue ? `&search=${searchValue}` : "";

      dispatch(
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage: String(currentPage),
        })
      );
    }

    fetchData();

    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const renderItems = () => {
    if (status === "loading") {
      return [...Array(8)].map((_, index) => {
        return <Skeleton key={index} />;
      });
    } else {
      return items.map((item: any, index: number) => {
        return <Card key={index} {...item} />;
      });
    }
  };

  const onClickCurrentPage = (pageId: number) => {
    dispatch(setCurrentPage(pageId));
  };

  return (
    <div className="content">
      <div className="container">
        {status === "error" ? (
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

            <Pagination onClickCurrentPage={onClickCurrentPage} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
