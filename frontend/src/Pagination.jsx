/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageLimit = 5;
  const totalPageGroups = Math.ceil(totalPages / pageLimit);
  const currentPageGroup = Math.ceil(currentPage / pageLimit);

  const goToPage = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const goToPrevGroup = () => {
    const prevGroupPage = (currentPageGroup - 1) * pageLimit;
    setCurrentPage(prevGroupPage);
  };

  const goToNextGroup = () => {
    const nextPageGroup = currentPageGroup * pageLimit + 1;
    setCurrentPage(nextPageGroup);
  };

  return (
    <div className="pagination">
      <button onClick={() => goToPrevGroup()} disabled={currentPageGroup === 1}>
        {"<"}
      </button>

      {Array.from({ length: pageLimit }).map((_, index) => {
        const pageNumber = (currentPageGroup - 1) * pageLimit + index + 1;
        if (pageNumber > totalPages) return null;

        return (
          <button
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            className={pageNumber === currentPage ? "active" : ""}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => goToNextGroup()}
        disabled={currentPageGroup === totalPageGroups}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
