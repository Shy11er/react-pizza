import React from "react";
import ReactPaginate from "react-paginate";

const Pagination: React.FC<any> = (onClickCurrentPage) => {
  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={(e) => {
        onClickCurrentPage(e.selected + 1);
      }}
      pageRangeDisplayed={8}
      pageCount={3}
    />
  );
};

export default Pagination;
