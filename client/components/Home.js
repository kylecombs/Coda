import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import notes from "../../public/lotties/notes";
import laptop from "../../public/lotties/laptop";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  const notesOptions = {
    loop: true,
    autoplay: true,
    animationData: notes,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const laptopOptions = {
    loop: true,
    autoplay: true,
    animationData: laptop,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="parent-div">
      <div className="greeting">
        <h3>user: {username}</h3>
      </div>
      <div className="links-sidebar">
        <h2 id="sidebar-header">snippets</h2>
        <Link to="/loops">{"< Loops />"}</Link>
        <Link to="/binaryTree">{"< Binary Tree />"}</Link>
        <Link to="/aMatrix">{"< A-Matrix />"}</Link>
      </div>
      <div id="hero-text">
        <h1>{"{coda}"}</h1>
        <div>
        <p>a web application for the exploration of{"   {"}</p>
        <p>{"(music && code)"}</p>
        <p>check out the snippets to the left to get started</p>
        <p>{"}"}</p>
        </div>
      </div>
      <div id="homepage-animation">
        <div id="notes-animation">
          <Lottie options={notesOptions}  width={800}/>
        </div>
        <div id="laptop-animation">
          <Lottie options={laptopOptions} width={800}/>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
