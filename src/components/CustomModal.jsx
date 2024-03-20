import React from "react";
import "../css/modal.css";
import { useSelector } from "react-redux";

function CustomModal({ id, onPopupClose }) {
  const usersObj = useSelector((state) => state.app.user);
  const data = usersObj.find((item) => item.id === id);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <h2>{data?.name.toUpperCase()}</h2>
        <p>{data?.email}</p>
        <p>{data?.age}</p>
        <p>{data?.gender}</p>
        <button className="btn btn-danger" onClick={onPopupClose}>
          close
        </button>
      </div>
    </div>
  );
}

export default CustomModal;
