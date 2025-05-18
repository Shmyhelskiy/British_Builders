import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { DOTS } from '../../hooks/usePagination';


interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  paginationRange: (number | string)[];
  totalItems: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  goToPage,
  nextPage,
  prevPage,
  paginationRange,
  totalItems,
}) => {
  if (totalItems === 0 || totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center mt-4 gap-1 sm:gap-2">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="p-2 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {paginationRange.map((pageItem, index) => {
        const key = `page-item-${pageItem}-${index}`;

        if (pageItem === DOTS) {
          return (
            <span key={key} className="px-2 py-1 text-sm text-gray-500 select-none">
              ...
            </span>
          );
        }

        return (
          <button
            key={key}
            onClick={() => goToPage(pageItem as number)}
            disabled={currentPage === pageItem}
            className={`px-2.5 py-1 sm:px-3 rounded-md text-sm 
                        transition-colors duration-150 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                        ${
                          currentPage === pageItem
                            ? 'font-bold cursor-default'
                            : 'cursor-pointer'
                        }`}
            aria-label={`Go to page ${pageItem}`}
            aria-current={currentPage === pageItem ? 'page' : undefined}
          >
            {pageItem}
          </button>
        );
      })}

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

export default PaginationControls;