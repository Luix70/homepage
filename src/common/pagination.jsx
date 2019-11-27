/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemCount, currentPage, itemsPerPage, pageClicked }) => {
  const numpages = Math.ceil(itemCount / itemsPerPage);
  const pages = _.range(1, numpages + 1);

  //console.log(itemCount, currentPage, itemsPerPage, pageClicked);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li
          key="0"
          className={"page-item " + (currentPage === 1 ? "disabled" : "")}
          onClick={() =>
            currentPage > 1 ? pageClicked(currentPage - 1) : null
          }
        >
          <a href="#" className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {pages.map(page => {
          return (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              onClick={() => pageClicked(page)}
            >
              <a href="#" className="page-link">
                {page}
              </a>
            </li>
          );
        })}
        <li
          key={pages + 1}
          className={
            "page-item " + (currentPage === numpages ? "disabled" : "")
          }
          onClick={() =>
            currentPage < numpages ? pageClicked(currentPage + 1) : null
          }
        >
          <a href="#" className="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  pageClicked: PropTypes.func.isRequired
};

export default Pagination;
