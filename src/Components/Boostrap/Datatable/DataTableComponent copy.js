import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';

const DataTableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState({ id: '', desc: false });
  const [globalFilter, setGlobalFilter] = useState('');
  const [prpcmDescFilter, setPrpcmDescFilter] = useState('');
  const [prpcmDisplayDescFilter, setPrpcmDisplayDescFilter] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize, sortBy, globalFilter, prpcmDescFilter, prpcmDisplayDescFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.111.90:4500/api/forms/projects/InsCustomerComplaint/test', {
        page: pageIndex + 1, // Send 1-based page index to the server
        pageSize,
        sortBy,
        globalFilter,
        filters: {
          prpcm_desc: prpcmDescFilter,
          prpcm_display_desc: prpcmDisplayDescFilter,
        }
      });

      const { count, datalist } = response.data;
      setData(datalist.slice(0, pageSize)); // Slice to ensure only pageSize amount of data is displayed
      setTotalCount(count);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: 'PRPCM DESC', accessor: 'PRPCM_DESC' },
      { Header: 'PRPCM DISPLAY DESC', accessor: 'PRPCM_DISPLAY_DESC' }
      // Add more columns as needed
    ],
    []
  );

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
      manualPagination: true, // Enable manual pagination
      pageCount: Math.ceil(totalCount / pageSize), // Calculate total page count
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setPageIndex(currentPageIndex); // Update pageIndex when it changes
  }, [currentPageIndex]);

  const handleSortChange = (columnId) => {
    const newSortBy = {
      id: columnId,
      desc: sortBy.id === columnId ? !sortBy.desc : false,
    };
    setSortBy(newSortBy);
  };

  return (
    <main id="main" className="main">
      <div>
        <div className="filters">
          {/* PRPCM DESC filter */}
          <input
            value={prpcmDescFilter}
            onChange={(e) => {
              const value = e.target.value || '';
              setPrpcmDescFilter(value);
              setPageIndex(0); // Reset to first page when changing filter
            }}
            placeholder="Search PRPCM DESC..."
          />
          {/* PRPCM DISPLAY DESC filter */}
          <input
            value={prpcmDisplayDescFilter}
            onChange={(e) => {
              const value = e.target.value || '';
              setPrpcmDisplayDescFilter(value);
              setPageIndex(0); // Reset to first page when changing filter
            }}
            placeholder="Search PRPCM DISPLAY DESC..."
          />
          {/* Add more input fields for other columns as needed */}
        </div>
        <table {...getTableProps()} className="datatable">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={column.isSorted ? (column.isSortedDesc ? 'desc' : 'asc') : ''}
                    onClick={() => handleSortChange(column.id)}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
              {pageIndex + 1} of {pageCount}
            </strong>{' '}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageIndex(0); // Reset to first page when changing page size
            }}
          >
            {[10, 25, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
          <input
            value={globalFilter || ''}
            onChange={(e) => {
              const value = e.target.value || '';
              setGlobalFilter(value);
              setPageIndex(0); // Reset to first page when changing global filter
            }}
            placeholder="Search..."
          />
        </div>
        {loading && <div>Loading...</div>}
      </div>
    </main>
  );
};

export default DataTableComponent;
