import React from "react";

const ShowCards = ({ columns, removeNote, RemoveColumn, pin }) => {
  const cards = Object.entries(columns).map((item) => {
    const title = item[1][0];
    const notes = item[1].slice(1).map((note, index) => {
      const id = "btn-" + item[0] + "-" + index;
      return (
        <div className="card mx-2 my-3">
          <div
            id={id}
            className="card-body text-dark p-2 border-0 text-start"
            onClick={() => {
              navigator.clipboard.writeText(note[0]);
              const ele = document.getElementById(id).classList;
              ele.toggle("text-muted");
              ele.toggle("text-decoration-line-through");
            }}
          >
            <span className="align-middle">{note[0]}</span>
            <button
              className="btn btn-outline-danger card-btn float-end border-0 bg-transparent "
              onClick={() => {
                removeNote(item[0], index + 1);
              }}
            >
              <i class="fas fa-trash-alt"></i>
            </button>
            <button
              className={
                note[1] > 0
                  ? "btn card-btn-2 float-end border-0 bg-transparent text-warning"
                  : "btn card-btn-2 float-end border-0 bg-transparent text-info"
              }
              onClick={(e) => {
                pin(item[0], index + 1);
                if (e.stopPropagation) e.stopPropagation();
              }}
            >
              <i class="fas fa-thumbtack"></i>
            </button>
          </div>
        </div>
      );
    });
    return (
      <div className="col text-light">
        <div className="border rounded-2 p-2">
          <p className="lead text-capitalize mb-4 position-relative">
            {title}
            <button
              className="btn btn-outline-danger float-end border-0 position-absolute end-0"
              onClick={() => {
                RemoveColumn(item[0]);
              }}
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </p>
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
