

const handlePageChange = (value, page, setPage, totalRecords) => {
    if (value === '&laquo;') {
      setPage(1);
    } else if (value === '&lsaquo;') {
      if (page !== 1) {
        setPage(page - 1);
      }
    } else if (value === '&rsaquo;') {
      if (page !== totalRecords)
        setPage(page + 1);
    } else if (value === '&raquo') {
      setPage(totalRecords);
    } else {
      setPage(value);
    }
}

export default handlePageChange;