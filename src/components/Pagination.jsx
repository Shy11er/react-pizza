import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = () => {
  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={(e) => {
        console.log(e);
      }}
      pageRangeDisplayed={8}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
