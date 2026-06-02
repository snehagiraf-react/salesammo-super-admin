import React, { useState, useEffect, useMemo } from "react";
import '../../assets/styles/pagination.css';

export const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const safeData = Array.isArray(data) ? data : [];

  const totalPages = Math.ceil(safeData.length / itemsPerPage) || 0;

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return safeData.slice(start, start + itemsPerPage);
  }, [safeData, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [safeData.length, itemsPerPage]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    currentItems,
    totalPages,
    handlePageChange,
    setCurrentPage,
  };
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const maxShown = 5;
    let start = Math.max(1, currentPage - Math.floor(maxShown / 2));
    let end = start + maxShown - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxShown + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
      {getPages().map((page) => (
        <button
          key={page}
          className={`pagination-btn${page === currentPage ? " active" : ""}`}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </nav>
  );
};

export default Pagination;