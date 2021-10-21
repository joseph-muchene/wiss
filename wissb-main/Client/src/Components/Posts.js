import React, { useEffect } from "react";
import { getAllposts } from "../Action/Post";
import PropTypes from "prop-types";
import Homelayout from "./Layout/Home_layout";
import { connect } from "react-redux";
import Pagination from "./Pagination";
import Post from "../Components/postCard";
import { useState } from "react";
const Posts = ({ getAllposts, posts }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfpages, setNumberOfpages] = useState(0);
  useEffect(() => {
    getAllposts(pageNumber);
  }, [getAllposts, pageNumber]);
  useEffect(() => {
    setNumberOfpages(posts.totalPages);
  });
  const pages = new Array(numberOfpages).fill(null).map((v, i) => i);

  return (
    <div>
      <main role="main">
        <Homelayout />
        <div className="container container-sm">
          <h1 className="text-center mb-4">Recent posts</h1>
          <Post posts={posts} />
          <div className="pagination">
            <Pagination
              pages={pages}
              posts={posts}
              setPageNumber={setPageNumber}
              total={posts.totalPages}
              pageNumber={pageNumber}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

Posts.propTypes = {
  getAllposts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  posts: state.Post.posts,
});

export default connect(mapStateToProps, { getAllposts })(Posts);
