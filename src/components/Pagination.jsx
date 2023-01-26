import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ setCurrentPage }) => {
  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={(e) => {
        setCurrentPage(e.selected + 1);
      }}
      pageRangeDisplayed={8}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
