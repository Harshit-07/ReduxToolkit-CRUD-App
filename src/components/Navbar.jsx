import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchInput } from "../features/userDataSlice";

function Navbar() {
  const users = useSelector((state) => state.app.user);
  const inputVal = useSelector((state) => state.app.searchInput);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container-fluid">
        <a className="navbar-brand">RTK</a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link className="text-black" to="/">
                Create Post
              </Link>
            </li>
            <li className="nav-item">
              <Link className="text-black" to="/read">
                All Post({users.length})
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control "
              type="search"
              placeholder="Search by name"
              value={inputVal}
              onChange={(e) => dispatch(searchInput(e.target.value))}
            ></input>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
