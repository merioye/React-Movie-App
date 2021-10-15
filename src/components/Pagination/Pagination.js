import React from 'react';
import ReactPaginate from 'react-paginate';
import './pagination.css';

const Pagination = ({pageCount, handlePageClick})=>{
    return(
        <ReactPaginate
                    previousLabel={window.innerWidth<540 ? "<" : 'prev'}
                    nextLabel={window.innerWidth<540 ? ">" : 'next'}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={window.innerWidth<540 ? 1 : 2}
                    pageRangeDisplayed={window.innerWidth<540 ? 2 : 5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
        />
    );
}

export default Pagination;