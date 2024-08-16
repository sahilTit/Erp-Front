import { useState, useEffect } from "react";
import axios from "axios";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import "../../UiCompoments/DataTable/DataTable.css";

const DataTableComponent = ({
  columns,
  tableName,
  whereCondition,
  handleClose,
  handleSelected,
  lovname
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [sortBy, setSortBy] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  let pageSize = 10;

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
        "/api/forms/projects/InsCustomerComplaint/test",
        {
          pageIndex: pageIndex + 1, // Page index starts from 0, adjust if your backend expects 1-based index
          pageSize,
          sortBy,
          globalFilter,
          filters,
          table: tableName,
          where: whereCondition,
        }
      );

      const { count, datalist } = response.data;
      setData(datalist);
      setTotalCount(count);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const handleColumnFilterChange = (columnId, value) => {
    setColumnFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: value,
    }));
    setPageIndex(0);
  };

  return (
    <>
      
      <div className="modal-header p-0" style={{ padding: "1px" }}>
        <h6 className='h6 p-1' style={{ fontWeight: 600 }}>{lovname}</h6>
        <span className="close1" style={{ fontSize: "2rem" }} onClick={handleClose} >&times;</span>
      </div>

      <table
        {...getTableProps()}
        className="datatable table table-bordered table-sm table-striped"
      >
        <thead>
          
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="text-center text-dark"
                  onClick={() =>
                    handleSortChange(column.id, !column.isSortedDesc)
                  }
                  key={column.id}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}

<tr>
            {columns.map((column) => (
              <th key={column.accessor} className="p-1">
                <input
                  className="form-control form-control-sm "
                  value={columnFilters[column.accessor] || ""}
                  onChange={(e) =>
                    handleColumnFilterChange(
                      column.accessor,
                      e.target.value
                    )
                  }
                  placeholder={`Search ${column.Header}...`}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={i}
                onClick={() => handleSelected(row)}
                style={{ cursor: "pointer" }}
              >

                {row.cells.map((cell) => (
                  <td
                    className="text-left ps-1"
                    {...cell.getCellProps()}
                    key={cell.getCellProps().key}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>


      <div className="pagination" style={{ fontSize: '0.8rem' }}>
        <div className="pagination-info">
          <span>
            Page <strong>{pageIndex + 1}</strong> of <strong>{Math.ceil(totalCount / pageSize)}</strong>
          </span>
        </div>

        <div className="pagination-buttons">
          <button className="badge text-dark btn-sm" onClick={() => gotoPage(0)} disabled={!canPreviousPage} style={{ fontSize: '0.8rem' }}>
            First
          </button>
          <button className="badge text-dark btn-sm" onClick={() => previousPage()} disabled={!canPreviousPage} style={{ fontSize: '0.8rem' }}>
            Previous
          </button>

          <div className="pagination-pages">
            {Array.from({ length: Math.min(5, pageCount) }, (_, index) => {
              const page = pageIndex - 2 + index;
              if (page >= 0 && page < pageCount) {
                return (
                  <button
                    key={page}
                    onClick={() => gotoPage(page)}
                    disabled={pageIndex === page}
                    className={pageIndex === page ? 'active btn btn-sm text-dark' : 'btn btn-sm text-dark'}
                  >
                    {page + 1}
                  </button>
                );
              }
              return null;
            })}
          </div>

          <button className="badge text-dark btn-sm " onClick={() => nextPage()} disabled={!canNextPage} style={{ fontSize: '0.8rem' }}>
            Next
          </button>
          <button className="badge text-dark btn-sm " onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} style={{ fontSize: '0.8rem' }}>
            Last
          </button>
        </div>

        {loading && <div>Loading...</div>}
      </div>

    </>
  );
};

export default DataTableComponent;
