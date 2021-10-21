import React from "react";
import Heart from "../../static/heart.svg";

const Home_layout = () => {
  return (
    <div>
      <div class="jumbotron  text-white jumbo-bg">
        <div class="col-sm-8 mx-auto">
          <h1 class="mb-3">Welcome to Wiss Blog</h1>

          <blockquote>
            <p>
              Wiss carries desire, hardwork and passion, hope you feel it to!
            </p>{" "}
            By <img src={Heart} className="heart" alt="" />
            <cite className="mb-4">Joseph muchene</cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Home_layout;
