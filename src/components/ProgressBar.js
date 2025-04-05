import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ progress, message }) => {
  return (
    <div className="progress-bar-container">
      <p>{message}</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
