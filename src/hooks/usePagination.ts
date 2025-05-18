import { useState, useMemo } from 'react';

export const DOTS = '...';

export function usePagination<T>(data: T[], rowsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const paginatedData = useMemo(() => {
    if (totalItems === 0) return [];
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [data, currentPage, rowsPerPage, totalItems]);

  const paginationRange = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const range: (number | string)[] = [];
    const delta = 1;

    const showLeftDots = currentPage > 2 + delta;
    const showRightDots = currentPage < totalPages - 1 - delta;

    if (!showLeftDots && showRightDots) {
      // Початок списку
      range.push(1, 2, 3, 4, DOTS, totalPages);
    } else if (showLeftDots && !showRightDots) {
      // Кінець списку
      range.push(1, DOTS, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else if (showLeftDots && showRightDots) {
      // Середина
      range.push(1, DOTS, currentPage - 1, currentPage, currentPage + 1, DOTS, totalPages);
    }

    return range;
  }, [currentPage, totalPages]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    paginatedData,
    currentPage,
    totalPages,
    totalItems,
    goToPage,
    nextPage,
    prevPage,
    paginationRange,
  };
}
