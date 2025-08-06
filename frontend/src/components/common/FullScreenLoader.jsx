import React from "react";
import { Spinner } from "react-bootstrap";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/animations/Trail loading.json";

const FullScreenLoader = ({ message = "Loading..." }) => {
    return (
        <div className="fullscreen-loader">

            <Spinner animation="border" role="status" variant="light" style={{ width: 60, height: 60 }} />
            <Lottie animationData={loaderAnimation} loop autoplay style={{ height: 150 }} />

            <p className="mt-3 text-white fw-semibold fs-5">{message}</p>
        </div>
    );
};

export default FullScreenLoader;

