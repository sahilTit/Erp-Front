import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';

// import './assets/css/style.css';
import '../../../../assets/css/style.css';
import '../../../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../../../../assets/vendor/boxicons/css/boxicons.min.css';
import '../../../../assets/vendor/quill/quill.snow.css';
import '../../../../assets/vendor/quill/quill.bubble.css';
import '../../../../assets/vendor/remixicon/remixicon.css';
import '../../../../assets/vendor/simple-datatables/style.css';

const DataTableComponent = (props,option) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState({});
  const [totalCount, setTotalCount] = useState(0);

  const columns = React.useMemo(
    () => [
      { Header: 'PRPCM DESC', accessor: 'PRPCM_DESC' },
      { Header: 'PRPCM DISPLAY DESC', accessor: 'PRPCM_DISPLAY_DESC' },
      { Header: 'PRPCM SHT DESC', accessor: 'PRPCM_SHT_DESC' },
      // Add more columns as needed
    ],
    []
  );

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize, sortBy, globalFilter, columnFilters]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const filters = {};
      Object.keys(columnFilters).forEach((key) => {
        filters[key] = columnFilters[key];
      });

      const response = await axios.post(
        'http://192.168.111.90:4500/api/forms/projects/InsCustomerComplaint/test',
        {
          pageIndex: pageIndex + 1, // Page index starts from 0, adjust if your backend expects 1-based index
          pageSize,
          sortBy,
          globalFilter,
          filters,
          table:'Pr_Prdcatg_Mst',
          where:" t.prpcm_Org_Id=1"
        }
      );

      const { count, datalist } = response.data;
      setData(datalist);
      setTotalCount(count);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    state: { pageIndex: currentPageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex, pageSize },
      manualPagination: true,
      pageCount: Math.ceil(totalCount / pageSize),
      manualSortBy: true,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setPageIndex(currentPageIndex);
  }, [currentPageIndex]);

  const handleSortChange = (columnId, desc) => {
    const newSortBy = [{ id: columnId, desc }];
    setSortBy(newSortBy);
  };

  const handleGlobalFilterChange = (e) => {
    const value = e.target.value || '';
    setGlobalFilter(value);
    gotoPage(0);
  };

  const handleColumnFilterChange = (columnId, value) => {
    setColumnFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: value,
    }));
    setPageIndex(0);
  };

  return (
    <main id="main" className="main">
      <div>
        <div className="filters">
          {/* <input
            value={globalFilter}
            onChange={handleGlobalFilterChange}
            placeholder="Search..."
          /> */}
          {/* {columns.map((column) => (
            <input
              key={column.accessor}
              value={columnFilters[column.accessor] || ''}
              onChange={(e) => handleColumnFilterChange(column.accessor, e.target.value)}
              placeholder={`Search ${column.Header}...`}
            />
          ))} */}
        </div>
        <table {...getTableProps()} className="datatable table-bordered table-striped">
          <thead>
            {headerGroups.map((headerGroup,i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                <th rowSpan='2' className="text-center">S.N.</th>
                {headerGroup.headers.map((column,i) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={column.isSorted ? (column.isSortedDesc ? 'desc' : 'asc') : ''}
                    onClick={() => handleSortChange(column.id, !column.isSortedDesc)}
                    key={i}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}

            <tr> 
              {/* <th ></th> */}
             {columns.map((column,i) => (
             
              <th key={i}>
            <input className='form-control'
              key={column.accessor}
              value={columnFilters[column.accessor] || ''}
              onChange={(e) => handleColumnFilterChange(column.accessor, e.target.value)}
              placeholder={`Search ${column.Header}...`}
            />
            </th>
          ))}</tr>
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i}>
                  <td className="text-center">{pageIndex*pageSize+i+1}</td>
                  {row.cells.map((cell,i) => (
                    <td {...cell.getCellProps()} key={i}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {Math.ceil(totalCount / pageSize)}
            </strong>{' '}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>
          {/* <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageIndex(0);
            }}
          >
            {[10, 25, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select> */}
        </div>
        {loading && <div>Loading...</div>}
      </div>
    </main>
  );
};

export default DataTableComponent;
