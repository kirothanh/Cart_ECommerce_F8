import ReactPaginate from "react-paginate";
import "../assets/css/Pagination.css";

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function Pagination({ totalPage, limitProduct, currentPage, onPageChange }) {
  const pageCount = Math.ceil(totalPage / limitProduct);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    onPageChange(selectedPage);
  };

  return (
    <>
      <div className="flex items-center justify-center mx-auto">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          previousLabel="< previous"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          forcePage={currentPage - 1}
          renderOnZeroPageCount={null}
          className="pagination flex items-center justify-normal gap-5 py-5"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="selected"
          previousClassName={currentPage === 1 ? "disabled" : ""}
          nextClassName={currentPage === pageCount ? "disabled" : ""}
        />
      </div>
    </>
  );
}
