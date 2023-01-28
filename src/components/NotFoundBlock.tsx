import React from "react";

const NotFoundBlock: React.FC = () => {
  return (
    <div
      style={{
        padding: "100px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: 'center'
      }}
    >
      <h1
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <span>🥺</span>
        <p>Nothing found</p>
      </h1>
      <p style={{ fontSize: "18px" }}>Unfortunately, this page does not exist on our site</p>
    </div>
  );
};

export default NotFoundBlock;
