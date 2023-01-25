import React from "react";

const Skeleton = () => {
  return (
    <>
      <div className="pizza-skeleton">
        <div className="pizza-skeleton__image" />
        <div className="pizza-skeleton__h4" />
        <div className="pizza-skeleton__selector">
          <ul>
            <li />
          </ul>
          <ul>
            <li />
          </ul>
        </div>
        <div className="pizza-skeleton__bottom">
          <div className="pizza-skeleton__price" />
          <div className="pizza-skeleton__button" />
        </div>
      </div>
    </>
  );
};

export default Skeleton;
