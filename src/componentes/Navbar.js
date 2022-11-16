import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logoipsum-288.svg";
import "./Navbar.css";

class Navbar extends Component {
  state = { clicked: false };
  handleMenu = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  render() {
    return (
      <nav>
        <a href="index.hmtl">
          <Logo />
        </a>
        <div>
          <ul
            id="navbar"
            className={this.state.clicked ? "#navbar active" : "#navbar"}
          >
            <li>
              <Link to="/">
                <a className="active" href="index.html">
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link to="list/create">
                <a href="index.html">Add</a>
              </Link>
            </li>
          </ul>
        </div>
        <div id="mobile" onClick={this.handleMenu}>
          <i
            id="bar"
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
      </nav>
    );
  }
}
export default Navbar;
