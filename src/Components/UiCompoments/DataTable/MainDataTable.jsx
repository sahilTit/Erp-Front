import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import "../DataTable/MainDataTable.css";
import { OprUnitId, OrgId } from "../../../Hooks/GeneralHooks";

const DataTableComponent = ({
  api,
  columnList,
  fixedwhere,
  onSelect,
  onClose,
  handleRowSelect,
  showTable,
  lovname
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState({});
  const [columnFilters1, setColumnFilters1] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const { orgId } = OrgId();
  const { oprUnitId } = OprUnitId();

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

      let whereClause = "";
      Object.keys(columnFilters1).forEach((key) => {
        const { value, type, columnId } = columnFilters1[key];
        if (type === "varchar") {
          whereClause += ` AND UPPER(${columnId}) LIKE UPPER('%${value}%') `;
        } else if (type === "date") {
          whereClause += ` AND ${columnId} = TO_DATE('${value}', 'YYYY-MM-DD') `;
        }
      });

      const response = await axios.post(api, {
        pageIndex: pageIndex + 1,
        pageSize,
        sortBy,
        globalFilter,
        filters,
        table: showTable,
        where: fixedwhere,
        orgId: orgId,
        oprId: oprUnitId,
        where: whereClause,
      });

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
      columns: React.useMemo(() => columnList, []),
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

  const handleColumnFilterChange = (columnId, value, type) => {
    setColumnFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: value,
    }));
    setColumnFilters1((prevFilters) => ({
      ...prevFilters,
      [columnId]: { value, type, columnId },
    }));
    setPageIndex(0);
  };

  return (
    <>
      <div className="modal-header p-0 m-0" style={{ padding: "1px" }}>
        <h6 className='h6 p-0' style={{ fontWeight: 600 }}> {lovname}</h6>
        <span className="close1 pointer p-0 m-0" style={{ fontSize: "2rem", cursor:'pointer' }} onClick={onClose} >&times;</span>
      </div>
      <table
        {...getTableProps()}
        className="table datatable table-bordered table-striped table-sm"
      >
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, i) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "desc"
                        : "asc"
                      : ""
                  }
                  onClick={() =>
                    handleSortChange(column.id, !column.isSortedDesc)
                  }
                  key={i}
                  rowSpan={column.type === "date" ? "2" : "1"}
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
            {columnList.map((column, i) => (
              <th
                key={i}
                style={column.type === "date" ? { display: "none" } : {}}
              >
                <input
                  className="form-control form-control-sm"
                  key={column.accessor}
                  value={columnFilters[column.apiWhere] || ""}
                  onChange={(e) =>
                    handleColumnFilterChange(
                      column.apiWhere,
                      e.target.value,
                      column.type
                    )
                  }
                  placeholder={`SEARCH ${column.Header}...`}
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
                onClick={() => handleRowSelect(row.original)}
                style={{ cursor: "pointer" }}
              >
                {/* <td className="text-center">{pageIndex * pageSize + i + 1}</td> */}
                {row.cells.map((cell, i) => (
                  <td className="text-left ps-2" {...cell.getCellProps()} key={i}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <div className="pagination-info">
          <span>
            Page <strong>{pageIndex + 1}</strong> of{" "}
            <strong>{Math.ceil(totalCount / pageSize)}</strong>
          </span>
        </div>

        <div className="pagination-buttons">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
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
                    className={pageIndex === page ? "active" : ""}
                  >
                    {page + 1}
                  </button>
                );
              }
              return null;
            })}
          </div>

          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>

        {loading && <div>Loading...</div>}
      </div>
    </>

  );
};

export default DataTableComponent;
