import React from "react";

const NothingWasFound: React.FC = () => {
  return (
    <div className="cart__empty">
      <div className="cart cart--empty">
        <h2>
          Nothing was found<>😕</>
        </h2>
        <p>
          Perhaps, you entered the wrong value in the search or there is no
          pizza with that name.
          <br />
          Enter something else.
        </p>
      </div>
    </div>
  );
};

export default NothingWasFound;
