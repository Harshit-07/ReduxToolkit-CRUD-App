import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser, deleteUser } from "../features/userDataSlice";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";

function Read() {
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const { user, loading } = useSelector((state) => state.app);
  const inputText = useSelector((state) => state.app.searchInput);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  const onPopupClose = () => {
    setIsOpen(false);
    setId(0);
  };

  return (
    <div className="bg-warning ">
      {isOpen && <CustomModal id={id} onPopupClose={onPopupClose} />}
      <h2 className="d-flex justify-content-center">
        {loading ? "Loading..." : "All Post"}
      </h2>
      {!loading &&
        user
          .filter((item) => {
            if (inputText.length === 0) {
              return item;
            } else {
              return item.name.toLowerCase().includes(inputText.toLowerCase());
            }
          })
          .map((item) => {
            return (
              <div
                className="d-flex flex-col justify-content-center align-items-center "
                key={item?.id}
              >
                <div className="card my-3">
                  <div className="card-body">
                    <h5 className="card-text">Name - {item?.name}</h5>
                    <p className="card-text">Email - {item?.email}</p>
                    <p className="card-text">(Response {item?.id})</p>

                    <div className="d-flex justify-content-evenly ">
                      <button
                        className="btn btn-secondary "
                        onClick={() => [setId(item.id), setIsOpen(true)]}
                      >
                        View
                      </button>
                      <Link to={`/edit/${item.id}`}>
                        <button className="btn btn-secondary mx-2">Edit</button>
                      </Link>
                      <button
                        className="btn btn-secondary"
                        onClick={() => dispatch(deleteUser(item.id))}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );

            // );
          })}
    </div>
  );
}

export default Read;
