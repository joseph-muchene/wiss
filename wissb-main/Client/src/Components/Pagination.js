import React from "react";

const Pagination = ({ pages, posts, setPageNumber, pageNumber, total }) => {
  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };
  const gotoNext = () => {
    setPageNumber(Math.min(total - 1, pageNumber + 1));
  };
  return (
    <div>
      {!posts.length > 0 && (
        <div className="container pagination__center mb-4 ">
          <nav aria-label="...">
            <ul class="pagination ">
              <li class="page-item ">
                <a
                  class="page-link"
                  href="#!"
                  tabindex="-1"
                  onClick={gotoPrevious}
                >
                  Previous
                </a>
              </li>
              {pages.map((index) => (
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#!"
                    key={index}
                    onClick={() => setPageNumber(index)}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}
              <li class="page-item ">
                <a class="page-link" href="#!" tabindex="-1" onClick={gotoNext}>
                  next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Pagination;
