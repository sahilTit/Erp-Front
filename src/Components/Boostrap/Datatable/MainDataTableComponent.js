import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";

// import './assets/css/style.css';

import "../assets/css/style.css";
import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../assets/vendor/boxicons/css/boxicons.min.css";
import "../assets/vendor/quill/quill.snow.css";
import "../assets/vendor/quill/quill.bubble.css";
import "../assets/vendor/remixicon/remixicon.css";
import "../assets/vendor/simple-datatables/style.css";
import { OprUnitId, OrgId } from "../../../Hooks/GeneralHooks";

const MainDataTableComponent = (props, option) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState({});
  const [columnFilters1, setColumnFilters1] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [api, SetApi] = useState(props.api);
  const { orgId } = OrgId();
  const { oprUnitId } = OprUnitId();

  const columns = React.useMemo(() => props.columnList, []);

  useEffect(() => {
    fetchData();
  }, [
    pageIndex,
    pageSize,
    sortBy,
    globalFilter,
    columnFilters,
    props.FixedWhere,
  ]);

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
          // Assuming value is in YYYY-MM-DD format
          whereClause += ` AND ${columnId} = TO_DATE('${value}', 'YYYY-MM-DD') `;
        }
        // Add more conditions for other types if needed
      });

      //pass data to another component

      // 'http://192.168.111.90:4500/api/forms/projects/InsCustomerComplaint/test',
      const response = await axios.post(api, {
        pageIndex: pageIndex + 1, // Page index starts from 0, adjust if your backend expects 1-based index
        pageSize,
        sortBy,
        globalFilter,
        filters,
        table: "Pr_Prdcatg_Mst",
        fixWhere: props.FixedWhere,
        orgId: orgId,
        oprId: oprUnitId,
        userId: props.userId,
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

  console.log("props :- ", props);

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
    const value = e.target.value || "";
    setGlobalFilter(value);
    gotoPage(0);
  };

  // const handleColumnFilterChange = (columnId, value) => {

  //   setColumnFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [columnId]: value,
  //   }));
  //   setPageIndex(0);
  // };

  const handleColumnFilterChange = (columnId, value, type) => {
    let updatedValue = value;
    // Update columnFilters state
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

  const handleRowClick = (row) => {
    props.onRowClick(row); // Call the function passed as prop
  };

  return (
    <>
      <table
        {...getTableProps()}
        className=" table datatable table-bordered table-sm table-hover table-striped"
        style={{ fontSize: "0.8rem", padding: "1px", cursor: "pointer" }}
      >
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {/* <th rowSpan='2' className="text-center">S.N.</th> */}
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
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    padding: "2px",
                    margin: "0px",
                  }}
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
            {/* <th ></th> */}
            {columns.map((column, i) => (
              <th
                key={i}
                style={column.type == "date" ? { display: "none" } : {}}
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
                  placeholder={``}
                  style={{ height: "3vh", padding: "0px" }}
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
                onClick={() => handleRowClick(row.original)}
              >
                {/* <td className="text-center"  style={{padding:'0px'}} >{pageIndex*pageSize+i+1}</td> */}
                {row.cells.map((cell, i) => (
                  <td
                    className="text-left ps-1"
                    {...cell.getCellProps()}
                    key={i}
                    style={{
                      padding: "3px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination" style={{ fontSize: "0.8rem" }}>
        <div className="pagination-info">
          <span>
            Page <strong>{pageIndex + 1}</strong> of{" "}
            <strong>{Math.ceil(totalCount / pageSize)}</strong>
          </span>
        </div>

        <div className="pagination-buttons">
          <button
            className="badge text-dark btn-sm"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            style={{ fontSize: "0.8rem" }}
          >
            First
          </button>
          <button
            className="badge text-dark btn-sm"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            style={{ fontSize: "0.8rem" }}
          >
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
                    className={
                      pageIndex === page
                        ? "active btn btn-sm text-dark"
                        : "btn btn-sm text-dark"
                    }
                  >
                    {page + 1}
                  </button>
                );
              }
              return null;
            })}
          </div>

          <button
            className="badge text-dark btn-sm "
            onClick={() => nextPage()}
            disabled={!canNextPage}
            style={{ fontSize: "0.8rem" }}
          >
            Next
          </button>
          <button
            className="badge text-dark btn-sm "
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            style={{ fontSize: "0.8rem" }}
          >
            Last
          </button>
        </div>

        {loading && <div>Loading...</div>}
      </div>
    </>
  );
};

export default MainDataTableComponent;
