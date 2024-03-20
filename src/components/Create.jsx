import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../features/userDataSlice";

const Create = () => {
  const [users, setUsers] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserData = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(users));
    navigate("/read");
  };

  return (
    <form
      className="d-flex flex-column align-items-center bg-warning"
      onSubmit={handleSubmit}
    >
      <h2 className="my-3 text">Fill the Form</h2>
      <div className="mb-3 ">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          name="name"
          onChange={getUserData}
        />
      </div>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail2"
          aria-describedby="emailHelp"
          name="email"
          onChange={getUserData}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Age</label>
        <input
          type="number"
          className="form-control"
          id="exampleInputEmail2"
          aria-describedby="emailHelp"
          name="age"
          onChange={getUserData}
        />
      </div>
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="flexRadioDefault1"
            value="Male"
            onChange={getUserData}
          />
          <label className="form-check-label" for="flexRadioDefault1">
            Male
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="flexRadioDefault2"
            value="Female"
            onChange={getUserData}
          />
          <label className="form-check-label" for="flexRadioDefault2">
            Female
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary my-3">
        Submit
      </button>
    </form>
  );
};

export default Create;
