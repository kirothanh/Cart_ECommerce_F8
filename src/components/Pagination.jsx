import ReactPaginate from "react-paginate";

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function Pagination({ totalPage, limitProduct, onPageChange }) {
  const pageCount = Math.ceil(totalPage / limitProduct);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    onPageChange(selectedPage);
  };

  return (
    <>
      <div className="mx-auto">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="flex items-center justify-normal gap-5 py-5"
        />
      </div>
    </>
  );
}
