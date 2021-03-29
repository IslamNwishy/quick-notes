import React from "react";

const ShowInfo = ({ columns, ResetAll }) => {
  const text = Object.entries(columns).map((item) => {
    return <li>{item[0] + " = " + item[1][0]}</li>;
  });
  return (
    <div className="container-sm fixed-bottom">
      <div className="d-flex justify-content-around align-items-center mb-5">
        <div className="text-light border rounded-2 text-start col-4 p-3 ">
          <p className="mb-1">
            {" "}
            To Add or Edit:{" "}
            <span className="text-warning">\add -CHARACTER -TITLE</span>
          </p>
          <p className="mb-1">
            {" "}
            To Remove: <span className="text-warning">\rem -CHARACTER</span>
          </p>
          <p>
            To Note:{" "}
            <span className="text-warning">
              CHARACTER[space or anything]NOTE
            </span>
          </p>
          <p className="mb-0">Hints:</p>
          <div className="mx-4">{text}</div>
        </div>
        <button
          className="btn btn-secondary px-5 py-3 fs-5 col-2"
          onClick={() => {
            ResetAll();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ShowInfo;
