import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ message = "Loading...", size = "md", centered = true }) => {
  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center w-100 py-4 ${
        centered ? "min-vh-50" : ""
      }`}
    >
      <Spinner
        animation="border"
        role="status"
        variant="primary"
        size={size === "sm" ? "sm" : undefined}
        style={{ width: size === "lg" ? "4rem" : "2rem", height: size === "lg" ? "4rem" : "2rem" }}
      />
      <span className="mt-2 text-muted fw-semibold">{message}</span>
    </div>
  );
};

export default Loader;