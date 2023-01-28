import React from "react";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  onClickCurrentPage: (num: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({onClickCurrentPage}) => {
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
