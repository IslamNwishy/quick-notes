import React from "react";

const ShowCards = ({ columns, removeNote }) => {
  const cards = Object.entries(columns).map((item) => {
    const title = item[1][0];
    const notes = item[1].slice(1).map((note, index) => {
      const id = "btn-" + item[0] + "-" + index;
      return (
        <div className="card mx-2 my-3">
          <button
            id={id}
            className="card-body text-dark p-2 border-0 text-start"
            onClick={() => {
              const ele = document.getElementById(id).classList;
              ele.toggle("text-muted");
              ele.toggle("text-decoration-line-through");
            }}
          >
            {note}
            <button
              className="btn btn-outline-danger float-end"
              onClick={() => {
                removeNote(item[0], index + 1);
              }}
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </button>
        </div>
      );
    });
    return (
      <div className="col text-light">
        <div className="border rounded-2 p-2">
          <p className="lead text-capitalize">{title}</p>
          <div className="cards">{notes <= 0 ? "No Notes Yet!" : notes}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="container ">
      <div className="row row-cols-4 g-3 mt-5">
        {cards.length <= 0 ? (
          <div className="text-light col-12 border rounded-2 p-4 fs-4">
            No Categories Yet use add to get started
          </div>
        ) : (
          cards
        )}
      </div>
    </div>
  );
};
export default ShowCards;
