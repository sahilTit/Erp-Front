import Draggable from "react-draggable";
import "./Draggable.css";

const DraggableContent = ({
  show,
  handleClose,
  handleSelectItem,
  filteredData,
  currentPage,
  itemsPerPage,
  handleSearch,
  totalPages,
  paginate,
  nextPage,
  prevPage,
  goToFirstPage,
  goToLastPage,
  paginationItems,
}) => {
  return (
    show && (
      <Draggable>
        <div
          style={{
            position: "fixed",
            left: "20%",
            top: "3%",
            zIndex: "1",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            width: "40%",
          }}
        >
          <button
            className="btn btn-danger"
            onClick={handleClose}
            style={{ marginTop: "10px" }}
          >
            Close
          </button>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>
                  <input type="text" onChange={handleSearch} />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item) => (
                  <tr
                    key={item.ADGM_GEN_ID}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelectItem(item)}
                  >
                    <td>{item.ADGM_DESC}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <nav>
            <ul className="pagination justify-content-end p-3">
              <li>
                <button onClick={goToFirstPage} className="page-link">
                  First
                </button>
              </li>
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button className="page-link" onClick={prevPage}>
                  Previous
                </button>
              </li>

              {paginationItems.map((page) => (
                <li
                  key={page}
                  className={`page-item ${
                    page === currentPage ? "active" : ""
                  }`}
                >
                  <button className="page-link" onClick={() => paginate(page)}>
                    {page}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button className="page-link" onClick={nextPage}>
                  Next
                </button>
              </li>
              <li>
                <button className="page-link" onClick={goToLastPage}>
                  Last
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </Draggable>
    )
  );
};

export default DraggableContent;
