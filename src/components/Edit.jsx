import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editUser } from "../features/userDataSlice";

function Edit() {
  const usersObj = useSelector((state) => state.app.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (id) {
      setUserInfo(usersObj.find((item) => item.id === id));
    }
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(userInfo));
    navigate("/read");
  };

  return (
    <form
      className="d-flex flex-column align-items-center bg-info"
      onSubmit={handleSubmit}
    >
      <h2 className="my-3 text">Edit the Form</h2>
      <div className="mb-3 ">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          name="name"
          value={userInfo?.name}
          onChange={handleChange}
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
          value={userInfo?.email}
          onChange={handleChange}
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
          value={userInfo?.age}
          onChange={handleChange}
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
            checked={userInfo.gender === "Male"}
            onChange={handleChange}
            readOnly
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
            checked={userInfo.gender === "Female"}
            onChange={handleChange}
            readOnly
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
}

export default Edit;
