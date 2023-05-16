import PaginationLogic from "./PaginationLogic";

const Pagination = ({ currentPage, totalPages, handleNextPage, handlePreviousPage, current }) => {
  const visiblePages = PaginationLogic(currentPage, totalPages);

  return (
    <div className="pagination justify-content-end">
      <ul className="pagination-list d-flex m-0 p-0 list-unstyled">
        <li>
          <button className="pagination-link border rounded-circle" disabled={currentPage === 1} onClick={handlePreviousPage}>
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </button>
        </li>
        {visiblePages.map((page, index) => (
          <li key={index} className="mx-1">
            {page === '...' ? (
              <span>{page}</span>
            ) : (
              <button className={`pagination-link border px-2 rounded-circle ${currentPage === page ? 'is-current bg-primary text-white' : ''}`} onClick={() => current(page)}>
                {page}
              </button>
            )}
          </li>
        ))}
        <li>
          <button className="pagination-link border rounded-circle" disabled={currentPage === totalPages} onClick={handleNextPage}>
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;