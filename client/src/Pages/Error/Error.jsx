import React from "react";
import "./Error.css";

function Error() {
  return (
    <div className="page" style={{ justifyContent: "center" }}>
      <div className="Error-code">404!</div>
      <div className="Error-message">Page not found!</div>
    </div>
  );
}

export default Error;
