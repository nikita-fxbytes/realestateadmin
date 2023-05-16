const PaginationLogic = (currentPage, totalPages) => {
    const visiblePages = [];
  
    // Add the current page and the pages before and after it
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i >= 1 && i <= totalPages) {
        visiblePages.push(i);
      }
    }
  
    // If there is a gap between the first visible page and the first page, add an ellipsis
    if (visiblePages[0] > 1) {
      visiblePages.unshift('...');
    }
  
    // If there is a gap between the last visible page and the last page, add an ellipsis
    if (visiblePages[visiblePages.length - 1] < totalPages) {
      visiblePages.push('...');
    }
  
    return visiblePages;
  };
  
  export default PaginationLogic;